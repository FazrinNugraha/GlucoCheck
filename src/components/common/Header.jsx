import React from "react";
import { Activity } from "lucide-react";

const Header = ({ showDiagnosisButton = false, onNewDiagnosis }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {/* Logo with background */}
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <Activity className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          GlucoCheck
        </h1>
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
