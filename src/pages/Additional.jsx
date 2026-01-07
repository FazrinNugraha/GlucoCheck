import React, { useState } from 'react';
import { FileText, ArrowLeft, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Header />
        <ProgressBar currentStep={3} />

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Informasi Tambahan</h2>
              <p className="text-gray-600">Opsional - Bantu kami memberikan analisis lebih akurat</p>
            </div>
          </div>

          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                placeholder="Contoh: Saya baru saja pulih dari sakit, atau sedang dalam program diet tertentu..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Catatan:</strong> Hasil analisis ini bersifat informatif dan tidak menggantikan konsultasi dengan dokter atau tenaga medis profesional.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> Kembali
            </button>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
  );
};

export default Additional;