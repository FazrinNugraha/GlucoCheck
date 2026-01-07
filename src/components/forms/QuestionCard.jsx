import React from 'react';

const QuestionCard = ({ question, index, value, onChange }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-800 mb-3">
        {index + 1}. {question.question}
      </label>

      {question.type === 'select' && (
        <select
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Pilih jawaban...</option>
          {question.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      {question.type === 'textarea' && (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
    </div>
  );
};

export default QuestionCard;