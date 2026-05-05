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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleNext = () => {
    // cek apakah pertanyaan saat ini sudah dijawab
    const currentAnswer = formData.answers[currentQuestion.id];
    
    if (!currentAnswer || currentAnswer === "") {
      setShowAlert(true);
      return;
    }

    // jika pertanyaan terakhir, lanjut ke step berikutnya
    if (isLastQuestion) {
      setStep(3);
    } else {
      // lanjut ke pertanyaan berikutnya
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (isFirstQuestion) {
      setStep(1);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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

            <h3 className="text-xl font-bold text-[#2D1B4E] mb-2">
              Pertanyaan Belum Dijawab
            </h3>
            <p className="text-gray-600 mb-6">
              Mohon jawab pertanyaan ini sebelum melanjutkan.
            </p>

            <button
              onClick={() => setShowAlert(false)}
              className="w-full bg-[#9D4EDD] hover:bg-[#853bbf] text-white font-semibold py-3 rounded-lg transition"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* PAGE */}
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <Header />
          <ProgressBar currentStep={2} />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#9D4EDD] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2D1B4E]">
                  Kuesioner Kesehatan
                </h2>
                <p className="text-gray-600">
                  Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <QuestionCard
                question={currentQuestion}
                index={currentQuestionIndex}
                value={formData.answers[currentQuestion.id]}
                onChange={updateAnswer}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> {isFirstQuestion ? 'Kembali' : 'Sebelumnya'}
              </button>

              <button
                onClick={handleNext}
                className="flex-1 bg-[#9D4EDD] hover:bg-[#853bbf] text-white font-semibold py-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {isLastQuestion ? 'Selesai' : 'Lanjutkan'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;
