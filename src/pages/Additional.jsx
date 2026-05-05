import React, { useState } from 'react';
import { FileText, ArrowLeft, Sparkles, ShieldCheck, Activity, ClipboardList } from 'lucide-react';
import { useForm } from '../context/FormContext';
import Header from '../components/common/Header';
import ProgressBar from '../components/common/ProgressBar';
import { analyzeHealthData } from '../services/GroqService';

const Additional = () => {
  const { formData, updateFormData, setResult, setStep } = useForm();
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeHealthData(formData);
      setResult(result);
      setStep(4);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Terjadi kesalahan saat menganalisis data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-5xl mx-auto pt-8">
        <Header />
        <ProgressBar currentStep={3} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT SECTION - EDUKASI */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#2D1B4E] mb-4">
              Sebelum Kami Menganalisis Data Anda
            </h2>

            <p className="text-gray-600 mb-8">
              Informasi tambahan rutinitas membantu sistem memberikan analisis risiko gula darah
              yang lebih akurat dan relevan dengan kondisi kesehatan Anda.
            </p>

            <div className="space-y-5">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 flex gap-4">
                <Activity className="w-8 h-8 text-[#9D4EDD]" />
                <div>
                  <h4 className="font-semibold text-[#2D1B4E] mb-1">Analisis Lebih Akurat</h4>
                  <p className="text-sm text-gray-700">
                    Data tambahan membantu AI memahami pola hidup dan kondisi kesehatan Anda jadi jauh lebih tajam.
                  </p>
                </div>
              </div>

              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5 flex gap-4">
                <ClipboardList className="w-8 h-8 text-cyan-500" />
                <div>
                  <h4 className="font-semibold text-[#2D1B4E] mb-1">Contoh Informasi Tambahan Rutinitas</h4>
                  <ul className="text-sm text-gray-700 list-disc ml-5">
                    <li>Sedang menjalani diet rendah gula</li>
                    <li>Rutin olahraga 3x seminggu atau gym</li>
                    <li>Mengonsumsi obat tertentu secara rutin</li>
                    <li>Baru pulih dari sakit</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 flex gap-4">
                <ShieldCheck className="w-8 h-8 text-yellow-500" />
                <div>
                  <h4 className="font-semibold text-[#2D1B4E] mb-1">Bukan Diagnosis Medis</h4>
                  <p className="text-sm text-gray-700">
                  Analisis dilakukan oleh sistem berbasis teknologi AI dan tidak menggantikan pemeriksaan medis langsung.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - FORM */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#9D4EDD] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2D1B4E]">Informasi Tambahan Rutinitas <br />Sehari-hari</h2>
                <p className="text-gray-600">
                  Membantu AI kami memahami pola hidup Anda lebih akurat
                </p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-[#2D1B4E] mb-3">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                  placeholder="Contoh: Saya sedang diet rendah gula dan rutin jogging 3x seminggu..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  Pastikan data yang Anda masukkan sudah benar sebelum melakukan analisis.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Kembali
              </button>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="flex-1 bg-[#9D4EDD] hover:bg-[#853bbf] text-white font-semibold py-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Analisis Sekarang
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Additional;
