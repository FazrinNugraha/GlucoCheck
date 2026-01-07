import React from 'react';
import { AlertCircle } from 'lucide-react';

const DisclaimerBox = () => {
  return (
    <div className="bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-amber-900 mb-2">Disclaimer Penting</h3>
          <p className="text-amber-800 text-sm leading-relaxed">
            Hasil analisis ini dibuat oleh AI berdasarkan informasi yang Anda berikan dan bersifat informatif.
            Ini BUKAN diagnosis medis dan tidak menggantikan konsultasi dengan dokter atau tenaga medis profesional.
            Jika Anda memiliki kekhawatiran tentang kesehatan Anda, segera konsultasikan dengan dokter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBox;