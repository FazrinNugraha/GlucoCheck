import React from "react";
import { ChevronDown } from "lucide-react";

const QuestionCard = ({ question, index, value, onChange }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-blue-50/50 shadow-sm space-y-4">
      <label className="block text-sm font-semibold text-gray-800 mb-3">
        {index + 1}. {question.question}
      </label>

      {/* SELECT */}
      {question.type === "select" && (
        <div className="relative">
          <select
            value={value || ""}
            onChange={(e) => onChange(question.id, e.target.value)}
            className={`
              w-full appearance-none
              px-4 py-3 pr-10
              rounded-lg
              border
              bg-white
              text-gray-800
              shadow-sm
              transition-all duration-200
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              hover:border-blue-400
              ${!value ? "text-gray-400" : "text-gray-800"}
            `}
          >
            <option value="" disabled>
              Pilih jawaban...
            </option>
            {question.options.map((option) => (
              <option key={option} value={option} className="text-gray-800">
                {option}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <ChevronDown
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              w-5 h-5
              text-gray-400
              pointer-events-none
            "
          />
        </div>
      )}

      {/* TEXT */}
      {question.type === "text" && (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="
            w-full px-4 py-3
            rounded-lg
            border border-gray-300
            focus:ring-2 focus:ring-blue-500
            focus:border-transparent
          "
        />
      )}

      {/* TEXTAREA */}
      {question.type === "textarea" && (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          className="
            w-full px-4 py-3
            rounded-lg
            border border-gray-300
            focus:ring-2 focus:ring-blue-500
            focus:border-transparent
          "
        />
      )}
    </div>
  );
};

export default QuestionCard;
