import axios from 'axios';
import { questions } from '../data/questions';

export const analyzeHealthData = async (formData) => {
  // Hitung BMI
  const heightInM = formData.height / 100;
  const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);

  const prompt = `Kamu adalah asisten kesehatan AI yang ahli dalam menganalisis risiko diabetes dan kesehatan gula darah. Analisis data pasien berikut:

DATA PRIBADI:
- Nama: ${formData.name}
- Usia: ${formData.age} tahun
- Berat Badan: ${formData.weight} kg
- Tinggi Badan: ${formData.height} cm
- BMI: ${bmi}

JAWABAN KUESIONER:
${questions
    .map(
      (q, i) => `${i + 1}. ${q.question}
   Jawaban: ${formData.answers[q.id] || 'Tidak dijawab'}`
    )
    .join('\n\n')}

${formData.additionalNotes ? `CATATAN TAMBAHAN:\n${formData.additionalNotes}` : ''}

Berikan analisis dalam format JSON berikut (HANYA JSON, tanpa teks lain):
{
  "status": "Baik" atau "Waspada" atau "Perlu Perhatian",
  "statusColor": "green" atau "yellow" atau "red",
  "ringkasan": "Penjelasan singkat kondisi (2-3 kalimat)",
  "risikoLevel": "Rendah" atau "Sedang" atau "Tinggi",
  "rekomendasi": [
    "5 rekomendasi spesifik berdasarkan jawaban"
  ],
  "urgensi": "Konsultasi segera" atau "Konsultasi dalam 1-2 minggu" atau "Cek rutin 3-6 bulan" atau "Pertahankan gaya hidup sehat",
  "dietTips": [
    "3-4 tips diet spesifik"
  ],
  "lifestyleTips": [
    "2-3 tips gaya hidup"
  ]
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
              'Kamu adalah asisten kesehatan AI yang ahli dalam menganalisis risiko diabetes. Selalu berikan response dalam format JSON yang valid.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // Parse JSON dari response AI
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error analyzing health data:', error);

    // Fallback jika API error
    return {
      status: 'Waspada',
      statusColor: 'yellow',
      ringkasan:
        'Berdasarkan data yang Anda berikan, ada beberapa faktor yang perlu diperhatikan. Kami merekomendasikan untuk berkonsultasi dengan dokter untuk pemeriksaan lebih lanjut.',
      risikoLevel: 'Sedang',
      rekomendasi: [
        'Kurangi konsumsi makanan dan minuman manis',
        'Tingkatkan aktivitas fisik minimal 30 menit per hari',
        'Jaga pola tidur yang teratur 7-8 jam per hari',
        'Perbanyak konsumsi sayur dan buah',
        'Monitor kadar gula darah secara berkala',
      ],
      urgensi: 'Konsultasi dalam 1-2 minggu',
      dietTips: [
        'Pilih karbohidrat kompleks seperti nasi merah, oat, dan roti gandum',
        'Perbanyak protein tanpa lemak seperti ikan, ayam tanpa kulit, dan tahu/tempe',
        'Konsumsi sayuran hijau dan buah dengan indeks glikemik rendah',
        'Batasi gula tambahan dan minuman manis',
      ],
      lifestyleTips: [
        'Jalan kaki 30 menit setiap hari',
        'Kelola stres dengan meditasi atau hobi',
        'Cek tekanan darah dan gula darah rutin',
      ],
    };
  }
};
