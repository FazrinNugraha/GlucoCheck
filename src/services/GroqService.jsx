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

  const prompt = `Kamu adalah dokter spesialis endokrinologi yang berpengalaman. Analisis data kesehatan pasien berikut dengan TELITI dan NATURAL (bukan template kaku):

DATA PASIEN:
Nama: ${formData.name}
Usia: ${formData.age} tahun
BMI: ${bmi} (${bmiCategory})

JAWABAN KUESIONER (ANALISIS SETIAP JAWABAN):
${questions
    .map(
      (q, i) => `${i + 1}. ${q.question}
   Jawaban: ${formData.answers[q.id] || 'Tidak dijawab'}`
    )
    .join('\n\n')}

${formData.additionalNotes ? `CATATAN TAMBAHAN:\n${formData.additionalNotes}` : ''}

PANDUAN ANALISIS:
- Q1 (Frekuensi makan): Pola makan mempengaruhi stabilitas gula darah
- Q2 (Rasa haus): Polidipsia = gejala klasik diabetes
- Q3 (Frekuensi BAK): Poliuria = gejala klasik diabetes
- Q4 (Riwayat keluarga): Faktor genetik sangat penting
- Q5 (Jam tidur): Kurang tidur → resistensi insulin
- Q6 (Konsumsi manis): Faktor diet paling krusial
- Q7 (Olahraga): Aktivitas fisik kurangi risiko
- Q8 (Kelelahan): Bisa jadi tanda diabetes
- Q9 (Riwayat gula darah): Data objektif sangat penting
- Q10 (Gejala lain): Identifikasi komplikasi

PEDOMAN STATUS:
- RED (Perlu Perhatian): BMI >27 + gejala ATAU gula darah >126 mg/dL puasa ATAU >2 gejala diabetes ATAU gejala komplikasi
- YELLOW (Waspada): BMI 25-27 ATAU 1-2 faktor risiko ATAU gula darah 100-125 ATAU riwayat keluarga + gaya hidup buruk
- GREEN (Baik): BMI <25 + gaya hidup sehat + tidak ada gejala

PENTING: 
- Tulis dengan gaya PERCAKAPAN dokter yang ramah, bukan format kaku
- Sebutkan temuan spesifik dari jawaban pasien (contoh: "Saya melihat Anda mengalami rasa haus sangat sering dan buang air kecil 10-12 kali sehari...")
- Setiap analisis harus UNIK berdasarkan kombinasi jawaban
- Variasikan bahasa dan struktur kalimat (jangan selalu mulai dengan "Berdasarkan...")
- Rekomendasi harus spesifik sesuai kondisi pasien, bukan list generic

Format JSON (tanpa markdown):
{
  "status": "Baik/Waspada/Perlu Perhatian",
  "statusColor": "green/yellow/red",
  "ringkasan": "Tulisan natural 5-7 kalimat seperti dokter berbicara langsung ke pasien, sebutkan temuan spesifik dari jawaban",
  "risikoLevel": "Rendah/Sedang/Tinggi",
  "rekomendasi": ["8-10 saran spesifik yang DISESUAIKAN dengan jawaban pasien"],
  "urgensi": "string",
  "dietTips": ["6-8 tips diet yang relevan dengan pola makan pasien"],
  "lifestyleTips": ["6-8 tips gaya hidup yang relevan dengan aktivitas pasien"]
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
              'Kamu dokter endokrinologi berpengalaman yang komunikatif dan empatis. Bicara seperti dokter sungguhan (natural, personal, bervariasi), BUKAN AI template. Setiap pasien unik - analisis mendalam dan berikan saran yang benar-benar disesuaikan. Gunakan bahasa yang hangat tapi tetap profesional. Response HARUS JSON valid.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7, // Naikan untuk lebih kreatif & natural
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
    
    // Log raw response dari AI
    console.log(' AI Raw Response:', aiResponse);
    
    const cleanResponse = aiResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) throw new Error('Invalid JSON response');

    const result = JSON.parse(jsonMatch[0]);
    
    const requiredFields = ['status', 'statusColor', 'ringkasan', 'risikoLevel', 'rekomendasi', 'urgensi', 'dietTips', 'lifestyleTips'];
    const missingFields = requiredFields.filter(field => !result[field]);
    if (missingFields.length > 0) throw new Error('Incomplete response');

    console.log(' AI BERHASIL JALAN:', result.status);

    return result;

  } catch (error) {
    console.log(' AI ERROR - menggunakan fallback');
    
    return generateFallbackAnalysis(formData, bmi, bmiCategory);
  }
};

const generateFallbackAnalysis = (formData, bmi, bmiCategory) => {
  const bmiValue = parseFloat(bmi);
  const answers = formData.answers;
  let riskScore = 0;
  let findings = [];
  
  // Analisis BMI
  if (bmiValue >= 30) {
    riskScore += 4;
    findings.push(`BMI Anda ${bmi} termasuk obesitas`);
  } else if (bmiValue >= 27) {
    riskScore += 3;
    findings.push(`BMI Anda ${bmi} cukup tinggi`);
  } else if (bmiValue >= 25) {
    riskScore += 1; // Hanya +1 untuk overweight ringan
    // Tidak masuk findings jika tidak ada gejala lain
  }
  
  // Q2: Rasa haus (HANYA hitung jika SANGAT SERING atau SERING)
  if (answers['q2']?.includes('Sangat sering')) {
    riskScore += 4;
    findings.push('rasa haus yang sangat berlebihan');
  } else if (answers['q2']?.includes('Sering')) {
    riskScore += 2;
    findings.push('sering merasa haus');
  }
  // "Jarang" atau "Tidak pernah" = 0 poin
  
  // Q3: Frekuensi BAK (HANYA hitung jika tinggi)
  if (answers['q3']?.includes('Lebih dari 12 kali')) {
    riskScore += 4;
    findings.push('frekuensi buang air kecil sangat tinggi (>12x/hari)');
  } else if (answers['q3']?.includes('10-12 kali')) {
    riskScore += 3;
    findings.push('sering buang air kecil (10-12x/hari)');
  } else if (answers['q3']?.includes('7-9 kali')) {
    riskScore += 1;
    findings.push('frekuensi BAK sedikit tinggi');
  }
  // "4-6 kali (Normal)" = 0 poin
  
  // Q4: Riwayat keluarga (tingkatkan bobot)
  if (answers['q4']?.includes('banyak anggota')) {
    riskScore += 3;
    findings.push('riw611ayat diabetes kuat di keluarga');
  } else if (answers['q4']?.includes('orangtua/saudara')) {
    riskScore += 2;
    findings.push('ada riwayat diabetes di keluarga dekat');
  } else if (answers['q4']?.includes('keluarga jauh')) {
    riskScore += 0.5; // Hanya sedikit
  }
  // "Tidak ada" = 0 poin
  
  // Q5: Tidur (HANYA hitung jika kurang)
  if (answers['q5']?.includes('Kurang dari 5')) {
    riskScore += 2;
    findings.push('pola tidur yang sangat kurang');
  } else if (answers['q5']?.includes('5-6 jam')) {
    riskScore += 1;
    findings.push('durasi tidur kurang optimal');
  }
  // "7-8 jam" atau ">8 jam" = 0 poin
  
  // Q6: Konsumsi manis (tingkatkan bobot)
  if (answers['q6']?.includes('Setiap hari')) {
    riskScore += 4;
    findings.push('konsumsi makanan/minuman manis setiap hari');
  } else if (answers['q6']?.includes('5-6x')) {
    riskScore += 2;
    findings.push('konsumsi makanan manis cukup sering');
  } else if (answers['q6']?.includes('3-4x')) {
    riskScore += 1;
  }
  // "Jarang (1-2x/minggu)" = 0 poin
  
  // Q7: Olahraga (HANYA hitung jika tidak pernah/jarang)
  if (answers['q7']?.includes('Tidak pernah')) {
    riskScore += 3;
    findings.push('tidak ada aktivitas olahraga');
  } else if (answers['q7']?.includes('1-2x')) {
    riskScore += 1;
  }
  // "3-4x" atau "Hampir setiap hari" = 0 poin (BAGUS!)
  
  // Q8: Kelelahan
  if (answers['q8']?.includes('Sangat sering')) {
    riskScore += 3;
    findings.push('kelelahan yang sangat sering');
  } else if (answers['q8']?.includes('Sering')) {
    riskScore += 1.5;
  }
  // "Jarang" atau "Tidak pernah" = 0 poin
  
  // Q9: Gula darah (SANGAT PENTING!)
  const gulaAnswer = answers['q9']?.toLowerCase() || '';
  const match = gulaAnswer.match(/\d+/);
  if (match) {
    const nilai = parseInt(match[0]);
    if (nilai >= 200) {
      riskScore += 10; // LANGSUNG RED
      findings.push(`hasil gula darah ${nilai} mg/dL yang sangat tinggi`);
    } else if (nilai >= 126) {
      riskScore += 8; // PASTI RED
      findings.push(`gula darah puasa ${nilai} mg/dL (diabetes)`);
    } else if (nilai >= 100) {
      riskScore += 3;
      findings.push(`gula darah ${nilai} mg/dL (prediabetes)`);
    }
  }
  
  // Q10: Gejala komplikasi (SANGAT SERIUS!)
  const gejala = answers['q10']?.toLowerCase() || '';
  if (gejala.includes('luka') && gejala.includes('sembuh')) {
    riskScore += 4;
    findings.push('luka yang lambat sembuh');
  }
  if (gejala.includes('kabur') || gejala.includes('mata') || gejala.includes('penglihatan')) {
    riskScore += 4;
    findings.push('gangguan penglihatan');
  }
  if (gejala.includes('kesemutan') || gejala.includes('kebas')) {
    riskScore += 4;
    findings.push('kesemutan di kaki/tangan');
  }
  
  // Tentukan status dengan threshold yang LEBIH KETAT
  let status, statusColor, risikoLevel, urgensi, ringkasan;
  
  if (riskScore >= 10) {
    // RED: Gejala serius atau gula darah tinggi atau komplikasi
    status = 'Perlu Perhatian';
    statusColor = 'red';
    risikoLevel = 'Tinggi';
    urgensi = 'Konsultasi segera ke dokter (1-3 hari)';
    
    const findingsText = findings.length > 0 ? findings.slice(0, 3).join(', ') : 'beberapa faktor risiko serius';
    ringkasan = `Dari hasil analisis, saya menemukan ${findingsText}${findings.length > 3 ? ', dan beberapa faktor lainnya' : ''}. Kondisi ini memerlukan perhatian serius karena menunjukkan risiko tinggi diabetes atau kemungkinan Anda sudah mengalaminya. Saya sangat menyarankan untuk segera periksa ke dokter dalam 1-3 hari ke depan untuk tes gula darah puasa dan HbA1c. Deteksi dini sangat penting untuk mencegah komplikasi seperti kerusakan mata, ginjal, atau saraf. Jangan tunda karena diabetes yang tidak tertangani bisa berbahaya.`;
    
  } else if (riskScore >= 5) {
    // YELLOW: Ada beberapa faktor risiko yang perlu diperhatikan
    status = 'Waspada';
    statusColor = 'yellow';
    risikoLevel = 'Sedang';
    urgensi = 'Konsultasi dalam 1-2 minggu';
    
    const findingsText = findings.length > 0 ? findings.join(', ') : 'beberapa faktor risiko';
    ringkasan = `Saya melihat ada ${findingsText} yang perlu Anda perhatikan. Meskipun kondisi Anda belum masuk kategori darurat, kombinasi faktor-faktor ini meningkatkan risiko diabetes di masa depan. Kabar baiknya, dengan perubahan gaya hidup yang tepat mulai sekarang, Anda bisa mencegahnya berkembang lebih jauh. Saya sarankan konsultasi ke dokter dalam 1-2 minggu untuk pemeriksaan gula darah dan mendapat panduan yang lebih spesifik. Fokuskan pada perbaikan pola makan, aktivitas fisik, dan kualitas tidur.`;
    
  } else {
    // GREEN: Kondisi baik, risiko rendah
    status = 'Baik';
    statusColor = 'green';
    risikoLevel = 'Rendah';
    urgensi = 'Pemeriksaan rutin 6-12 bulan';
    
    if (findings.length > 0) {
      ringkasan = `Secara keseluruhan, kondisi kesehatan Anda cukup baik dengan risiko diabetes yang rendah. Memang ada ${findings.join(', ')}, tapi ini masih dalam batas yang bisa dikelola dengan baik. Yang penting sekarang adalah mempertahankan gaya hidup sehat yang sudah Anda jalani. Tetap rutin berolahraga, jaga pola makan bergizi, dan tidur cukup. Jangan lupa lakukan pemeriksaan kesehatan termasuk cek gula darah setiap 6-12 bulan untuk memastikan semuanya tetap aman.`;
    } else {
      ringkasan = `Kabar baik! Kondisi kesehatan Anda sangat baik dengan risiko diabetes yang rendah. Pola makan Anda teratur, aktivitas fisik cukup, dan tidak ada gejala yang mengkhawatirkan. Pertahankan gaya hidup sehat ini - Anda sudah melakukan banyak hal dengan benar. Tetap jaga pola makan bergizi, olahraga teratur, dan tidur cukup. Lakukan pemeriksaan kesehatan rutin setiap 6-12 bulan sebagai langkah preventif. Terus pertahankan kebiasaan baik Anda!`;
    }
  }
  
  // Rekomendasi dinamis
  const rekomendasi = [];
  
  if (bmiValue >= 25) {
    const target = (bmiValue * 0.05).toFixed(1);
    rekomendasi.push(`Turunkan berat badan bertahap target 5-10% (sekitar ${target} kg) dalam 3-6 bulan`);
  }
  
  if (answers['q6']?.includes('Setiap hari') || answers['q6']?.includes('5-6x')) {
    rekomendasi.push('Kurangi drastis konsumsi makanan/minuman manis - ini prioritas utama untuk Anda');
  }
  
  if (answers['q7']?.includes('Tidak pernah')) {
    rekomendasi.push('Mulai olahraga ringan: jalan kaki 15-20 menit setiap hari, tingkatkan bertahap');
  } else if (answers['q7']?.includes('1-2x')) {
    rekomendasi.push('Tingkatkan frekuensi olahraga menjadi minimal 4-5x per minggu');
  }
  
  if (answers['q5']?.includes('Kurang dari 5') || answers['q5']?.includes('5-6 jam')) {
    rekomendasi.push('Perbaiki kualitas tidur - targetkan 7-8 jam per malam dengan jadwal konsisten');
  }
  
  if (riskScore >= 4) {
    rekomendasi.push('Lakukan pemeriksaan gula darah puasa dan HbA1c di laboratorium');
  }
  
  if (answers['q2']?.includes('Sering') || answers['q3']?.includes('10-12')) {
    rekomendasi.push('Gejala haus & sering BAK yang Anda alami perlu diperiksa dokter segera');
  }
  
  rekomendasi.push('Monitor berat badan dan lingkar pinggang secara rutin');
  rekomendasi.push('Perbanyak minum air putih 8-10 gelas per hari');
  rekomendasi.push('Kelola stres dengan baik - yoga, meditasi, atau hobi yang Anda suka');
  rekomendasi.push('Catat pola makan dan aktivitas harian untuk evaluasi');
  
  // Diet tips
  const dietTips = [
    'Gunakan piring gizi seimbang: ½ sayur, ¼ protein, ¼ karbohidrat',
    'Pilih nasi merah, oat, atau quinoa sebagai pengganti nasi putih',
    'Protein setiap makan: ikan, ayam, telur, tempe, tahu',
    'Perbanyak sayur hijau: bayam, brokoli, kangkung minimal 3 porsi/hari',
    'Buah indeks glikemik rendah: apel, pir, jambu biji, stroberi',
    'Hindari minuman manis kemasan, soda, dan jus dengan gula tambahan',
    'Gunakan minyak zaitun untuk memasak, konsumsi kacang-kacangan',
    'Batasi gorengan dan makanan tinggi lemak jenuh',
  ];
  
  // Lifestyle tips
  const lifestyleTips = [
    'Jalan cepat atau jogging 30 menit, 5x seminggu',
    'Latihan kekuatan 2-3x/minggu: push up, squat, plank',
    'Tidur dan bangun di jam yang sama setiap hari',
    'Hindari gadget 1 jam sebelum tidur',
    'Bergerak setiap 30 menit jika kerja duduk',
    'Luangkan waktu untuk relaksasi dan hobi',
    'Berhenti merokok dan batasi alkohol',
    'Jaga hidrasi sepanjang hari',
  ];

  return {
    status,
    statusColor,
    ringkasan,
    risikoLevel,
    rekomendasi,
    urgensi,
    dietTips,
    lifestyleTips,
  };
};