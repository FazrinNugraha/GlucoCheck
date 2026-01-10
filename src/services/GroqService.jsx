import axios from 'axios';
import { questions } from '../data/questions';

export const analyzeHealthData = async (formData) => {
  // Hitung BMI
  const heightInM = formData.height / 100;
  const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Kurus';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Kelebihan Berat';
    return 'Obesitas';
  };

  const bmiCategory = getBMICategory(parseFloat(bmi));

  const prompt = `Analisis data kesehatan berikut dan berikan respons HANYA dalam format JSON yang valid, tanpa teks apapun di luar JSON:

DATA PRIBADI:
- Usia: ${formData.age} tahun
- BMI: ${bmi} (${bmiCategory})

JAWABAN KUESIONER:
${questions
    .map(
      (q, i) => `${i + 1}. ${q.question}
   Jawaban: ${formData.answers[q.id] || 'Tidak dijawab'}`
    )
    .join('\n\n')}

${formData.additionalNotes ? `CATATAN TAMBAHAN:\n${formData.additionalNotes}` : ''}

PENTING: Berikan analisis yang DETAIL dan JELAS, terutama untuk status "Waspada". Jelaskan faktor risiko yang ditemukan, dampak potensial, dan langkah-langkah konkret yang harus dilakukan.

Respons HARUS dalam format JSON berikut (tanpa markdown, tanpa backticks):
{
  "status": "string",
  "statusColor": "string",
  "ringkasan": "string panjang (minimal 4-5 kalimat) yang menjelaskan kondisi, faktor risiko yang teridentifikasi, dampak jika diabaikan, dan pentingnya tindakan preventif",
  "risikoLevel": "string",
  "rekomendasi": ["minimal 7-8 rekomendasi spesifik dan actionable"],
  "urgensi": "string",
  "dietTips": ["minimal 5-6 tips diet yang detail"],
  "lifestyleTips": ["minimal 4-5 tips gaya hidup yang spesifik"]
}`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content:
              'Kamu adalah asisten kesehatan AI. Respons HARUS berupa JSON valid tanpa markdown atau teks tambahan. Gunakan pedoman: BMI >27 ATAU ada gejala diabetes (sering haus, sering buang air, lemas) = status "Perlu Perhatian" (red). BMI 25-27 ATAU 1-2 faktor risiko = "Waspada" (yellow). Sisanya = "Baik" (green).',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2500,
        top_p: 0.9,
        stream: false,
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content.trim();
    const cleanResponse = aiResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) throw new Error('Invalid JSON response');

    const result = JSON.parse(jsonMatch[0]);
    
    // Simple validation
    const requiredFields = ['status', 'statusColor', 'ringkasan', 'risikoLevel', 'rekomendasi', 'urgensi', 'dietTips', 'lifestyleTips'];
    const missingFields = requiredFields.filter(field => !result[field]);
    if (missingFields.length > 0) throw new Error('Incomplete response');

    // Debug log - HANYA 1 LOG
    console.log('✅ AI JALAN:', result.status);

    return result;

  } catch (error) {
    // Debug log - HANYA 1 LOG
    console.log('❌ AI ERROR - menggunakan fallback');
    
    return generateFallbackAnalysis(formData, bmi, bmiCategory);
  }
};

const generateFallbackAnalysis = (formData, bmi, bmiCategory) => {
  const bmiValue = parseFloat(bmi);
  let riskScore = 0;
  
  if (bmiValue >= 30) riskScore += 3;
  else if (bmiValue >= 27) riskScore += 2;
  else if (bmiValue >= 25) riskScore += 1;
  
  const answers = formData.answers;
  const diabetesSymptoms = [
    answers['q1'], answers['q2'], answers['q3']
  ].filter(a => a && (a.toLowerCase().includes('sering') || a.toLowerCase().includes('ya')));
  
  if (diabetesSymptoms.length >= 2) riskScore += 3;
  else if (diabetesSymptoms.length === 1) riskScore += 1;
  
  if (answers['q4']?.toLowerCase().includes('ya')) riskScore += 2;
  
  if (answers['q5']?.toLowerCase().includes('tidak') || 
      answers['q5']?.toLowerCase().includes('jarang')) riskScore += 1;
  
  let status, statusColor, risikoLevel, urgensi, ringkasan;
  
  if (riskScore >= 5) {
    status = 'Perlu Perhatian';
    statusColor = 'red';
    risikoLevel = 'Tinggi';
    urgensi = 'Konsultasi segera';
    ringkasan = `Berdasarkan BMI Anda (${bmi} - ${bmiCategory}) dan hasil analisis kuesioner, kondisi kesehatan Anda memerlukan perhatian serius. Anda memiliki beberapa faktor risiko diabetes yang signifikan. Sangat disarankan untuk segera berkonsultasi dengan dokter untuk pemeriksaan lebih lanjut termasuk tes gula darah puasa, HbA1c, dan pemeriksaan kesehatan menyeluruh. Deteksi dini dan penanganan tepat dapat mencegah komplikasi serius di masa depan.`;
  } else if (riskScore >= 3) {
    status = 'Waspada';
    statusColor = 'yellow';
    risikoLevel = 'Sedang';
    urgensi = 'Konsultasi dalam 1-2 minggu';
    ringkasan = `Berdasarkan BMI Anda (${bmi} - ${bmiCategory}) dan jawaban kuesioner, kondisi kesehatan Anda masuk kategori "Waspada" dengan tingkat risiko sedang. Terdapat ${riskScore} faktor risiko yang teridentifikasi yang dapat meningkatkan kemungkinan terkena diabetes di masa depan. ${
      bmiValue >= 25 ? `BMI Anda berada di kategori ${bmiCategory}, yang merupakan salah satu faktor risiko utama.` : ''
    } ${
      diabetesSymptoms.length > 0 ? `Anda juga menunjukkan ${diabetesSymptoms.length} gejala yang perlu diperhatikan.` : ''
    } Meskipun kondisi ini belum kritis, sangat penting untuk segera melakukan perubahan gaya hidup dan berkonsultasi dengan dokter dalam 1-2 minggu untuk pemeriksaan preventif. Dengan tindakan yang tepat sekarang, Anda dapat mencegah perkembangan ke kondisi yang lebih serius. Fokus pada penurunan berat badan bertahap, peningkatan aktivitas fisik, dan perbaikan pola makan akan sangat membantu menurunkan risiko Anda.`;
  } else {
    status = 'Baik';
    statusColor = 'green';
    risikoLevel = 'Rendah';
    urgensi = 'Cek rutin 3-6 bulan';
    ringkasan = `Berdasarkan BMI Anda (${bmi} - ${bmiCategory}) dan jawaban kuesioner, kondisi kesehatan Anda dalam kategori "Baik" dengan tingkat risiko rendah. Anda telah menunjukkan pola hidup yang cukup sehat. Pertahankan gaya hidup sehat Anda dengan terus berolahraga, mengonsumsi makanan bergizi, dan melakukan pemeriksaan kesehatan rutin setiap 3-6 bulan untuk memastikan kondisi Anda tetap optimal. Tetap waspada terhadap perubahan kondisi kesehatan dan konsultasikan dengan dokter jika ada keluhan.`;
  }

  return {
    status,
    statusColor,
    ringkasan,
    risikoLevel,
    rekomendasi: [
      bmiValue >= 25 ? 'Turunkan berat badan secara bertahap dengan target 5-10% dari berat saat ini' : 'Pertahankan berat badan ideal dengan monitor rutin',
      'Kurangi konsumsi makanan dan minuman manis, termasuk soda, jus kemasan, dan kue',
      'Tingkatkan aktivitas fisik minimal 150 menit per minggu atau 30 menit per hari',
      'Monitor kadar gula darah secara berkala setiap 3-6 bulan',
      'Konsumsi makanan bergizi seimbang dengan porsi terkontrol menggunakan piring gizi seimbang',
      'Perbanyak minum air putih minimal 8 gelas per hari',
      'Kelola stres dengan baik melalui meditasi, yoga, atau hobi yang menyenangkan',
      'Tidur cukup dan berkualitas 7-8 jam setiap malam',
      riskScore >= 3 ? 'Lakukan pemeriksaan HbA1c dan gula darah puasa di laboratorium' : 'Jaga konsistensi pola hidup sehat',
    ],
    urgensi,
    dietTips: [
      'Pilih karbohidrat kompleks: nasi merah, oat, quinoa, ubi, singkong rebus',
      'Tingkatkan asupan protein berkualitas: ikan (salmon, tuna, makarel), ayam tanpa kulit, telur, tempe, tahu',
      'Perbanyak serat dari sayuran hijau (bayam, kangkung, brokoli) dan buah indeks glikemik rendah (apel, pir, jambu)',
      'Batasi gula tambahan maksimal 4 sendok makan (50g) per hari dari semua sumber',
      'Gunakan lemak sehat: minyak zaitun, alpukat, kacang-kacangan, biji-bijian',
      'Terapkan metode piring: 1/2 sayur, 1/4 protein, 1/4 karbohidrat',
      'Hindari gorengan dan makanan tinggi lemak jenuh',
      'Kurangi konsumsi garam maksimal 1 sendok teh (5g) per hari',
    ],
    lifestyleTips: [
      'Olahraga aerobik 30 menit (jalan cepat, jogging, bersepeda, berenang), minimal 5 kali seminggu',
      'Tambahkan latihan kekuatan (push up, squat, angkat beban ringan) 2-3 kali per minggu',
      'Tidur cukup 7-8 jam setiap malam dengan jadwal tidur yang konsisten',
      'Kelola stres dengan teknik relaksasi: meditasi 10 menit per hari, pernapasan dalam, atau yoga',
      'Hindari duduk terlalu lama, bergerak setiap 30 menit jika pekerjaan kantoran',
      'Berhenti merokok dan batasi konsumsi alkohol',
      'Jaga hidrasi dengan minum air putih 2-2.5 liter per hari',
    ],
  };
};