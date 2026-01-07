import React from 'react';
import { FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { useForm } from '../context/FormContext';
import Header from '../components/common/Header';
import ProgressBar from '../components/common/ProgressBar';
import QuestionCard from '../components/forms/QuestionCard';
import { questions } from '../data/questions';

const Questionnaire = () => {
  const { formData, updateAnswer, setStep } = useForm();

  return (
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
              <h2 className="text-2xl font-bold text-gray-800">Kuesioner Kesehatan</h2>
              <p className="text-gray-600">Jawab pertanyaan berikut dengan jujur</p>
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
              onClick={() => setStep(3)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Lanjutkan <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;