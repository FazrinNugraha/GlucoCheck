import axios from 'axios';
import { questions } from '../data/questions';

export const analyzeHealthData = async (formData) => {
  const heightInM = formData.height / 100;
  const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Kurus';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Kelebihan Berat';
    return 'Obesitas';
  };

  const bmiCategory = getBMICategory(parseFloat(bmi));

  const prompt = `Kamu dokter endokrinologi berpengalaman. Analisis kesehatan pasien dengan natural:

DATA PASIEN:
- Nama: ${formData.name}, Usia: ${formData.age} tahun
- BMI: ${bmi} (${bmiCategory})

JAWABAN KUESIONER:
${questions.map((q, i) => `${i + 1}. ${q.question}\n   ${formData.answers[q.id] || 'Tidak dijawab'}`).join('\n\n')}

${formData.additionalNotes ? `CATATAN: ${formData.additionalNotes}` : ''}

TUGAS KAMU: 
Buat analisis NATURAL seperti dokter berbicara ke pasien. Fokus ke temuan dari jawaban.

PENTING: Kamu TIDAK perlu tentukan status (green/yellow/red) - sistem yang handle itu.
Tugas kamu HANYA buat teks yang informatif dan personal.

JSON format (no markdown):
{
  "ringkasan": "5-7 kalimat natural dengan temuan spesifik dari jawaban",
  "rekomendasi": ["8-10 saran spesifik berdasarkan kondisi pasien"],
  "dietTips": ["6-8 tips diet relevan"],
  "lifestyleTips": ["6-8 tips gaya hidup relevan"]
}`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'Dokter endokrinologi yang komunikatif. Analisis dengan teliti, bicara natural. Response JSON valid.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2500,
        top_p: 0.95,
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
    console.log('🤖 AI Raw Response:', aiResponse);
    
    const aiResult = JSON.parse(aiResponse);
    
    // Validasi field yang AI generate
    const requiredAIFields = ['ringkasan', 'rekomendasi', 'dietTips', 'lifestyleTips'];
    if (requiredAIFields.some(field => !aiResult[field])) throw new Error('Incomplete AI response');

    // Hitung status dengan logika KETAT (bukan dari AI!)
    const correctStatus = calculateStatus(formData, bmi);
    
    // Gabungkan: Status dari logika + Teks dari AI
    const result = {
      status: correctStatus.status,
      statusColor: correctStatus.color,
      risikoLevel: correctStatus.level,
      urgensi: correctStatus.urgensi,
      ringkasan: aiResult.ringkasan,
      rekomendasi: aiResult.rekomendasi,
      dietTips: aiResult.dietTips,
      lifestyleTips: aiResult.lifestyleTips,
    };

    console.log('✅ AI JALAN:', result.status);
    return result;

  } catch (error) {
    console.log('❌ AI ERROR - fallback');
    return generateFallbackAnalysis(formData, bmi, bmiCategory);
  }
};

// Helper function: Hitung status dengan logika ketat
const calculateStatus = (formData, bmi) => {
  const bmiValue = parseFloat(bmi);
  const answers = formData.answers;
  
  let isRED = false;
  let isYELLOW = false;
  const findings = [];
  
  // 1. Gula darah
  const gulaAnswer = answers['q9']?.match(/\d+/g);
  if (gulaAnswer) {
    const gula = Math.max(...gulaAnswer.map(n => parseInt(n)));
    if (gula >= 50 && gula <= 600) {
      if (gula >= 126) {
        isRED = true;
        findings.push(`gula darah ${gula} mg/dL`);
      } else if (gula >= 100) {
        isYELLOW = true;
        findings.push(`gula darah ${gula} mg/dL`);
      }
    }
  }
  
  // 2. Komplikasi
  const gejala = answers['q10']?.toLowerCase() || '';
  if (gejala.includes('luka') || gejala.includes('kabur') || gejala.includes('kesemutan')) {
    isRED = true;
    findings.push('gejala komplikasi');
  }
  
  // 3. BMI + gejala
  const haus = answers['q2']?.includes('Sangat sering') || answers['q2']?.includes('Sering');
  const bak = answers['q3']?.includes('10-12') || answers['q3']?.includes('Lebih dari 12');
  
  if (bmiValue >= 27 && (haus || bak)) {
    isRED = true;
    findings.push(`BMI ${bmi} + gejala`);
  } else if (bmiValue >= 25) {
    isYELLOW = true;
    findings.push(`BMI ${bmi}`);
  }
  
  // 4. Riwayat + gaya hidup buruk
  const riwayat = answers['q4']?.includes('orangtua') || answers['q4']?.includes('banyak');
  const manisSetiapHari = answers['q6']?.includes('Setiap hari');
  const tidakOlahraga = answers['q7']?.includes('Tidak pernah');
  const tidurKurang = answers['q5']?.includes('Kurang dari 5') || answers['q5']?.includes('5-6 jam');
  
  if (riwayat && (manisSetiapHari || tidakOlahraga)) {
    isYELLOW = true;
    findings.push('riwayat keluarga + gaya hidup berisiko');
  }
  
  // 5. Gejala tunggal
  if ((haus && !bak) || (!haus && bak)) {
    isYELLOW = true;
    findings.push(haus ? 'sering haus' : 'BAK sering');
  }
  
  // Tentukan status
  if (isRED) {
    return { status: 'Perlu Perhatian', color: 'red', level: 'Tinggi', urgensi: 'Konsultasi segera (1-3 hari)', findings };
  } else if (isYELLOW) {
    return { status: 'Waspada', color: 'yellow', level: 'Sedang', urgensi: 'Konsultasi dalam 1-2 minggu', findings };
  } else {
    return { status: 'Baik', color: 'green', level: 'Rendah', urgensi: 'Pemeriksaan rutin 6-12 bulan', findings };
  }
};

const generateFallbackAnalysis = (formData, bmi, bmiCategory) => {
  const correctStatus = calculateStatus(formData, bmi);
  const { status, color, level, urgensi, findings } = correctStatus;
  
  // ========== RINGKASAN ==========
  let ringkasan;
  if (color === 'red') {
    ringkasan = `Hasil analisis menunjukkan kondisi yang perlu perhatian serius. ${findings.join(', ')}. Saya sangat menyarankan untuk segera berkonsultasi dengan dokter dalam 1-3 hari untuk pemeriksaan lengkap termasuk tes gula darah puasa dan HbA1c. Deteksi dini sangat penting untuk mencegah komplikasi diabetes seperti kerusakan mata, ginjal, dan saraf.`;
  } else if (color === 'yellow') {
    ringkasan = `Kondisi kesehatan Anda saat ini dalam kategori waspada. Ditemukan: ${findings.join(', ')}. Meskipun belum kritis, faktor-faktor ini meningkatkan risiko diabetes. Kabar baiknya, dengan perubahan gaya hidup sekarang, risiko bisa diturunkan. Konsultasi ke dokter dalam 1-2 minggu untuk pemeriksaan dan panduan lebih lanjut.`;
  } else {
    ringkasan = `Kabar baik! Kondisi kesehatan Anda sangat baik dengan risiko diabetes rendah. Pola hidup Anda sudah cukup sehat. Pertahankan kebiasaan baik ini - makan teratur, olahraga rutin, dan tidur cukup. Lakukan pemeriksaan kesehatan rutin setiap 6-12 bulan sebagai langkah preventif.`;
  }
  
  // ========== REKOMENDASI DINAMIS ==========
  const bmiValue = parseFloat(bmi);
  const answers = formData.answers;
  const rekomendasi = [];
  
  if (bmiValue >= 25) rekomendasi.push(`Turunkan berat badan 5-10% (target ${(bmiValue * 0.05).toFixed(1)} kg dalam 3-6 bulan)`);
  if (answers['q6']?.includes('Setiap hari')) rekomendasi.push('PRIORITAS: Kurangi drastis konsumsi makanan/minuman manis');
  if (answers['q7']?.includes('Tidak pernah')) rekomendasi.push('Mulai olahraga ringan: jalan kaki 20 menit/hari');
  if (answers['q5']?.includes('Kurang dari 5')) rekomendasi.push('Tingkatkan durasi tidur menjadi 7-8 jam/malam');
  if (color === 'red' || color === 'yellow') rekomendasi.push('Lakukan pemeriksaan gula darah puasa dan HbA1c');
  
  rekomendasi.push('Monitor berat badan secara rutin', 'Minum air putih 8-10 gelas/hari', 'Kelola stres dengan meditasi atau yoga', 'Catat pola makan harian');
  
  return {
    status,
    statusColor: color,
    ringkasan,
    risikoLevel: level,
    rekomendasi,
    urgensi,
    dietTips: [
      'Piring gizi seimbang: ½ sayur, ¼ protein, ¼ karbohidrat',
      'Pilih nasi merah/oat pengganti nasi putih',
      'Protein setiap makan: ikan, ayam, telur, tempe',
      'Sayur hijau 3-5 porsi/hari',
      'Buah rendah gula: apel, pir, jambu',
      'Hindari minuman manis kemasan',
      'Minyak zaitun untuk memasak',
      'Batasi gorengan'
    ],
    lifestyleTips: [
      'Jalan cepat 30 menit, 5x/minggu',
      'Latihan kekuatan 2-3x/minggu',
      'Tidur-bangun jam sama setiap hari',
      'Hindari gadget 1 jam sebelum tidur',
      'Bergerak tiap 30 menit saat kerja',
      'Relaksasi 10 menit/hari',
      'Stop merokok & batasi alkohol',
      'Jaga hidrasi sepanjang hari'
    ],
  };
};