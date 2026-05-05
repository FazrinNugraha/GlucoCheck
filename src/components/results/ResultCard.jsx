import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const ResultCard = ({ result, userName, userAge }) => {
  const statusColors = {
    green: 'bg-green-100 text-green-800 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    red: 'bg-red-100 text-red-800 border-red-300'
  };

  const statusIcons = {
    green: <CheckCircle className="w-6 h-6" />,
    yellow: <AlertCircle className="w-6 h-6" />,
    red: <AlertCircle className="w-6 h-6" />
  };

  return (
    <>
      <div className="flex items-center gap-2 text-[#9D4EDD] mb-4">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Analisis Selesai</span>
      </div>

      <h2 className="text-3xl font-bold text-[#2D1B4E] mb-2">Hasil Analisis Anda</h2>
      <p className="text-gray-600 mb-6">
        Berdasarkan data yang Anda berikan: <strong>{userName}</strong>, {userAge} tahun
      </p>

      <div className={`border-2 rounded-lg p-6 mb-6 ${statusColors[result.statusColor]}`}>
        <div className="flex items-center gap-3 mb-3">
          {statusIcons[result.statusColor]}
          <div>
            <h3 className="text-xl font-bold">{result.status}</h3>
            <p className="text-sm">Tingkat Risiko: {result.risikoLevel}</p>
          </div>
        </div>
        <p className="leading-relaxed">{result.ringkasan}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-[#2D1B4E] mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#9D4EDD]" />
            Rekomendasi Perawatan
          </h3>
          <ul className="space-y-3">
            {result.rekomendasi.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-[#9D4EDD] font-semibold shrink-0">{index + 1}.</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-[#2D1B4E] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#9D4EDD]" />
            Tingkat Urgensi
          </h3>
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <p className="text-[#2D1B4E] font-semibold text-lg">{result.urgensi}</p>
          </div>

          <h4 className="font-semibold text-[#2D1B4E] mb-3">Tips Diet:</h4>
          <ul className="space-y-2">
            {result.dietTips.map((tip, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-green-600">•</span>
                <span className="text-gray-700 text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-bold text-[#2D1B4E] mb-3">Tips Gaya Hidup Sehat</h3>
        <div className="space-y-2">
          {result.lifestyleTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#9D4EDD] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultCard;