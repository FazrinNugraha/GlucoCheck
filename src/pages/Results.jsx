import React from 'react';
import { useForm } from '../context/FormContext';
import Header from '../components/common/Header';
import ResultCard from '../components/results/ResultCard';
import DisclaimerBox from '../components/results/DisclaimerBox';

const Results = () => {
  const { formData, result, resetForm, setStep } = useForm();

  const handleNewDiagnosis = () => {
    resetForm();
  };

  if (!result) {
    setStep(1);
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto pt-8 pb-12">
        <Header showDiagnosisButton onNewDiagnosis={handleNewDiagnosis} />

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <ResultCard
            result={result}
            userName={formData.name}
            userAge={formData.age}
          />
        </div>

        <DisclaimerBox />

        <div className="mt-8 text-center">
          <button
            onClick={handleNewDiagnosis}
            className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Mulai Diagnosis Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;