import React from 'react';
import { Sparkles } from 'lucide-react';

const TipsBox = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-blue-900 mb-2">Tips untuk Hasil Terbaik</h3>
          <ul className="text-sm text-blue-800 space-y-1">
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