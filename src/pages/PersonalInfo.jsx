import React, { useState } from "react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { useForm } from "../context/FormContext";
import Header from "../components/common/Header";
import ProgressBar from "../components/common/ProgressBar";
import TipsBox from "../components/common/TipsBox";

/* ================= MAIN PAGE ================= */
const PersonalInfo = () => {
  const { formData, updateFormData, setStep } = useForm();
  const [showAlert, setShowAlert] = useState(false);

  const handleNext = () => {
    if (formData.name && formData.age && formData.weight && formData.height) {
      setStep(2);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* ALERT MODAL */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center animate-scaleIn">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-yellow-500" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Data Belum Lengkap
            </h3>
            <p className="text-gray-600 mb-6">
              Mohon lengkapi semua data sebelum melanjutkan.
            </p>

            <button
              onClick={() => setShowAlert(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* PAGE */}
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto pt-6">
          <Header />
          <ProgressBar currentStep={1} />

          {/* MAIN CARD */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* SIMPLE HEADER */}
            <div className="px-6 md:px-8 pt-8 pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#2D1B4E] mb-2">
                Data Diri
              </h2>
              <p className="text-gray-600 text-sm">
                Kami butuh beberapa informasi dasar untuk analisis yang lebih akurat
              </p>
            </div>

            {/* FORM SECTION */}
            <div className="px-6 md:px-8 py-8">
              {/* Nama */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2D1B4E] mb-2">
                  Nama lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent transition text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Data Fisik - Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-[#2D1B4E] mb-2">
                    Usia
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent transition text-gray-900 placeholder:text-gray-400"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">tahun</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D1B4E] mb-2">
                    Berat
                  </label>
                  <input
                    type="number"
                    placeholder="65"
                    value={formData.weight}
                    onChange={(e) => updateFormData("weight", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent transition text-gray-900 placeholder:text-gray-400"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">kg</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D1B4E] mb-2">
                    Tinggi
                  </label>
                  <input
                    type="number"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) => updateFormData("height", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent transition text-gray-900 placeholder:text-gray-400"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">cm</span>
                </div>
              </div>

              {/* Info Box - Simple */}
              <div className="bg-purple-50 border-l-4 border-[#9D4EDD] p-4 mb-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#9D4EDD]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#2D1B4E] font-medium mb-1">
                      Tentang privasi data Anda
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Data ini hanya digunakan untuk analisis dan tidak disimpan di server kami. 
                      Hasil yang diberikan bersifat edukatif, bukan diagnosis medis.
                    </p>
                  </div>
                </div>
              </div>

              <TipsBox />

              {/* Button - Simple */}
              <button
                onClick={handleNext}
                className="w-full bg-[#9D4EDD] hover:bg-[#853bbf] active:bg-[#7b36b5] text-white font-medium py-3.5 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                Lanjutkan
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Semua field wajib diisi untuk melanjutkan
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
