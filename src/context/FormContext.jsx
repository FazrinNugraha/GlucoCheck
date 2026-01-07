import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    answers: {},
    additionalNotes: ''
  });
  const [result, setResult] = useState(null);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAnswer = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }));
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      age: '',
      weight: '',
      height: '',
      answers: {},
      additionalNotes: ''
    });
    setResult(null);
  };

  return (
    <FormContext.Provider
      value={{
        step,
        setStep,
        formData,
        result,
        setResult,
        updateFormData,
        updateAnswer,
        resetForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
};