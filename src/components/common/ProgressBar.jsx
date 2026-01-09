import React from 'react';
import { Check, Circle, Sparkles } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { id: 1, icon: Circle },
    { id: 2, icon: Check },
    { id: 3, icon: Sparkles }
  ];

  return (
    <div className="w-full px-4 py-8">
      {/* Container untuk steps */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
        
        {/* Progress line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-300"
          style={{ 
            width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'
          }}
        />

        {/* Steps */}
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div
              key={step.id}
              className="relative z-10 flex items-center justify-center"
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${isCompleted || isCurrent ? 'bg-blue-500' : 'bg-gray-200'}
                `}
              >
                <StepIcon 
                  className={`
                    w-6 h-6
                    ${isCompleted || isCurrent ? 'text-white' : 'text-gray-400'}
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;