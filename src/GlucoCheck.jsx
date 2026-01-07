import React from "react";
import { FormProvider, useForm } from "./context/FormContext";

import PersonalInfo from "./pages/PersonalInfo";
import Questionnaire from "./pages/Questionnaire";
import Additional from "./pages/Additional";
import Results from "./pages/Results";

const GlucoCheckContent = () => {
  const { step } = useForm();

  switch (step) {
    case 1:
      return <PersonalInfo />;
    case 2:
      return <Questionnaire />;
    case 3:
      return <Additional />;
    case 4:
      return <Results />;
    default:
      return <PersonalInfo />;
  }
};

const GlucoCheck = () => {
  return (
    <FormProvider>
      <GlucoCheckContent />
    </FormProvider>
  );
};

export default GlucoCheck;
