import { Question } from '@/types'

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onSelect: (index: number) => void
}

export default function QuestionCard({ question, selectedAnswer, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
      <h2 className="text-xl font-semibold text-white mb-6 leading-snug">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 text-sm leading-relaxed ${
              selectedAnswer === index
                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
                : 'border-white/10 hover:border-indigo-500/20 hover:bg-white/10 text-slate-200'
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  )
}
