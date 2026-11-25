import React from 'react'

export default function QuizQuestion({ question, questionNumber, total, selectedOption, onSelect }) {
  const options = [
    { key: 'A', text: question.option_a },
    { key: 'B', text: question.option_b },
    { key: 'C', text: question.option_c },
    { key: 'D', text: question.option_d },
  ]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Question {questionNumber} of {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${
              i < questionNumber ? 'bg-blue-500' : 'bg-gray-200'
            }`} />
          ))}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">{question.question_text}</h3>
      <div className="space-y-3">
        {options.map(({ key, text }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              selectedOption === key
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
              selectedOption === key ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>{key}</span>
            <span className="text-sm leading-relaxed pt-1">{text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
