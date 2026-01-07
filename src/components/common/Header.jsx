import React from 'react';
import { Activity } from 'lucide-react';

const Header = ({ showDiagnosisButton = false, onNewDiagnosis }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Activity className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">GlucoCheck</h1>
      </div>
      {showDiagnosisButton && (
        <button
          onClick={onNewDiagnosis}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Diagnosis Baru
        </button>
      )}
    </div>
  );
};

export default Header;