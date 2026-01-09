import React, { useState } from 'react';
import { FileText, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useForm } from '../context/FormContext';
import Header from '../components/common/Header';
import ProgressBar from '../components/common/ProgressBar';
import QuestionCard from '../components/forms/QuestionCard';
import { questions } from '../data/questions';

const Questionnaire = () => {
  const { formData, updateAnswer, setStep } = useForm();
  const [showAlert, setShowAlert] = useState(false);

  const handleNext = () => {
    // cek apakah semua pertanyaan sudah dijawab
    const allAnswered = questions.every(
      (q) => formData.answers[q.id] !== undefined && formData.answers[q.id] !== ""
    );

    if (!allAnswered) {
      setShowAlert(true);
      return;
    }

    setStep(3);
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
              Kuesioner Belum Lengkap
            </h3>
            <p className="text-gray-600 mb-6">
              Mohon jawab semua pertanyaan sebelum melanjutkan.
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
        <div className="max-w-3xl mx-auto pt-8">
          <Header />
          <ProgressBar currentStep={2} />

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Kuesioner Kesehatan
                </h2>
                <p className="text-gray-600">
                  Jawab pertanyaan berikut dengan jujur
                </p>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  value={formData.answers[question.id]}
                  onChange={updateAnswer}
                />
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Kembali
              </button>

              <button
                onClick={handleNext}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Lanjutkan <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;
