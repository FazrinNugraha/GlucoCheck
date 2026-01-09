import React, { useState } from "react";
import { User, ArrowRight, AlertTriangle } from "lucide-react";
import { useForm } from "../context/FormContext";
import Header from "../components/common/Header";
import ProgressBar from "../components/common/ProgressBar";
import TipsBox from "../components/common/TipsBox";

/* ================= LEFT INFO PANEL ================= */
const InfoPanel = () => {
  return (
    <div className="space-y-6 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-800">
        Kenapa Kami Membutuhkan Data Ini?
      </h2>

      <p className="text-gray-600">
        Informasi ini membantu sistem memberikan analisis risiko yang lebih
        akurat dan relevan dengan kondisi kesehatan Anda.
      </p>

      <div className="space-y-4">
        {[
          {
            title: "Analisis Personal",
            desc: "Hasil disesuaikan berdasarkan data unik Anda",
          },
          {
            title: "Privasi Terjaga",
            desc: "Data tidak disimpan dan hanya digunakan sementara",
          },
          {
            title: "Bukan Diagnosis Medis",
            desc: "Hasil bersifat edukatif, bukan pengganti dokter",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm"
          >
            <h4 className="font-semibold text-blue-600 mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

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
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 p-4">
        <div className="max-w-6xl mx-auto pt-8">
          <Header />
          <ProgressBar currentStep={1} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
            {/* LEFT PANEL */}
            <div className="hidden lg:block lg:col-span-1">
              <InfoPanel />
            </div>

            {/* FORM CARD */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Informasi Pribadi
                    </h2>
                    <p className="text-gray-600">
                      Isi informasi dibawah ini dengan benar dan akurat <span className="text-red-500">*</span>
                    </p>
                  </div>
                </div>

                {/* FORM */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        updateFormData("name", e.target.value)
                      }
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="Usia"
                      value={formData.age}
                      onChange={(e) =>
                        updateFormData("age", e.target.value)
                      }
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Berat (kg)"
                      value={formData.weight}
                      onChange={(e) =>
                        updateFormData("weight", e.target.value)
                      }
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Tinggi (cm)"
                      value={formData.height}
                      onChange={(e) =>
                        updateFormData("height", e.target.value)
                      }
                      className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <TipsBox />

                <button
                  onClick={handleNext}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 mt-6 transition"
                >
                  Lanjutkan <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
