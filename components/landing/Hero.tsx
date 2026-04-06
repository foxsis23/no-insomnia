import Link from 'next/link'
import { Moon, Brain, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-50 to-slate-50 pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          Безкоштовний тест — 3 хвилини
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Чому ви не можете спати —{' '}
          <span className="text-indigo-500">і що з цим робити</span>
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          10 запитань — і ви дізнаєтесь свій тип безсоння, його причину,
          та конкретні кроки для повернення нормального сну.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/test"
            className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-indigo-200"
          >
            Дізнатись свій тип безсоння →
          </Link>
          <p className="text-slate-500 text-sm">Без реєстрації. Безкоштовно.</p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-500" />
            <span>5 типів безсоння</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-500" />
            <span>Науково обґрунтовано</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <span>Результат одразу</span>
          </div>
        </div>
      </div>
    </section>
  )
}
