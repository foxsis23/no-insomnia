import { ResultData } from '@/types'

interface ResultCardProps {
  result: ResultData
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">
          {result.emoji}
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
