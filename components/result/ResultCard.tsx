import { Brain, Moon, Sunrise, Shuffle, HeartPulse, type LucideIcon } from 'lucide-react'
import { ResultData, ResultType } from '@/types'

const RESULT_ICONS: Record<ResultType, LucideIcon> = {
  tense_falling_asleep: Brain,
  night_waking: Moon,
  early_rising: Sunrise,
  broken_sleep: Shuffle,
  anxiety_before_sleep: HeartPulse,
}

interface ResultCardProps {
  result: ResultData
}

export default function ResultCard({ result }: ResultCardProps) {
  const Icon = RESULT_ICONS[result.type] || Brain
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
          <Icon className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />
        </div>
        <div>
          <div className="text-xs font-medium text-indigo-500 uppercase tracking-wide mb-1">
            Ваш тип безсоння
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{result.title}</h1>
        </div>
      </div>
      <p className="text-slate-600 leading-relaxed">{result.shortText}</p>
    </div>
  )
}
