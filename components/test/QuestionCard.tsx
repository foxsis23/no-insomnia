import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onSelect: (index: number) => void
}

export default function QuestionCard({ question, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-6 leading-snug">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 text-sm leading-relaxed ${
              selectedAnswer === index
                ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  )
}
