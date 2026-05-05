import React from "react";
import { Check } from "lucide-react";

const QuestionCard = ({ question, index, value, onChange }) => {
  return (
    <div className="space-y-6">
      <label className="block text-xl font-bold text-[#2D1B4E] mb-6">
        {index + 1}. {question.question}
      </label>

      {/* RADIO BUTTON CARDS */}
      {question.type === "select" && (
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange(question.id, option)}
                className={`
                  w-full text-left px-5 py-4 rounded-lg
                  border-2 transition-all duration-200
                  flex items-center justify-between
                  group hover:shadow-md
                  ${
                    isSelected
                      ? "border-[#9D4EDD] bg-purple-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-[#9D4EDD]/50"
                  }
                `}
              >
                <span
                  className={`
                    font-medium text-base
                    ${isSelected ? "text-[#2D1B4E]" : "text-gray-700"}
                  `}
                >
                  {option}
                </span>

                {/* Check Icon */}
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center
                    transition-all duration-200
                    ${
                      isSelected
                        ? "bg-[#9D4EDD] scale-100"
                        : "bg-gray-200 scale-0 group-hover:scale-100"
                    }
                  `}
                >
                  <Check
                    className={`
                      w-4 h-4
                      ${isSelected ? "text-white" : "text-gray-400"}
                    `}
                  />
                </div>
              </button>
            );
          })}
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
            w-full px-5 py-4
            rounded-lg
            border-2 border-gray-200
            focus:ring-2 focus:ring-[#9D4EDD]
            focus:border-[#9D4EDD]
            transition-all duration-200
            text-base
          "
        />
      )}

      {/* TEXTAREA */}
      {question.type === "textarea" && (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className="
            w-full px-5 py-4
            rounded-lg
            border-2 border-gray-200
            focus:ring-2 focus:ring-[#9D4EDD]
            focus:border-[#9D4EDD]
            transition-all duration-200
            text-base
            resize-none
          "
        />
      )}
    </div>
  );
};

export default QuestionCard;
