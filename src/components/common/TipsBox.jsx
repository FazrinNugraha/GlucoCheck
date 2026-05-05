import React from 'react';
import { Sparkles } from 'lucide-react';

const TipsBox = () => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#9D4EDD] mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-[#2D1B4E] mb-2">Tips untuk Hasil Terbaik</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Pastikan data yang Anda masukkan akurat</li>
            <li>✓ Isi semua pertanyaan dengan jujur</li>
            <li>✓ Hasil analisis bersifat informatif, bukan diagnosis medis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TipsBox;