import { ResultType } from '@/types'
import { QUESTIONS } from '@/data/questions'

export function calculateResult(answers: number[]): ResultType {
  const scores: Record<ResultType, number> = {
    tense_falling_asleep: 0,
    night_waking: 0,
    early_rising: 0,
    broken_sleep: 0,
    anxiety_before_sleep: 0
  }

  answers.forEach((answerIndex, questionIndex) => {
    const question = QUESTIONS[questionIndex]
    if (!question) return
    const answer = question.answers[answerIndex]
    if (!answer) return

    Object.entries(answer.weights).forEach(([type, weight]) => {
      scores[type as ResultType] += weight
    })
  })

  const result = Object.entries(scores).reduce(
    (max, [type, score]) => (score > max.score ? { type: type as ResultType, score } : max),
    { type: 'tense_falling_asleep' as ResultType, score: -1 }
  )

  return result.type
}
