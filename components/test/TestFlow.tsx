'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/data/questions'
import { calculateResult } from '@/lib/scoring'
import { saveTestResult } from '@/lib/stubs'
import { trackEvent } from '@/lib/analytics'
import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'

export default function TestFlow() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]
  const isLast = currentIndex === QUESTIONS.length - 1

  function handleSelect(index: number) {
    setSelectedAnswer(index)
  }

  async function handleNext() {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (isLast) {
      setIsSubmitting(true)
      const resultType = calculateResult(newAnswers)
      const sessionId = crypto.randomUUID()

      trackEvent('test_completed', { result_type: resultType })
      await saveTestResult(sessionId, resultType, newAnswers)
      router.push(`/result?type=${resultType}`)
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
    }
  }

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500">Аналізуємо ваші відповіді…</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelect={handleSelect}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {isLast ? 'Отримати результат' : 'Далі →'}
        </button>
      </div>
    </div>
  )
}
