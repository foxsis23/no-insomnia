import Image from 'next/image'
import Link from 'next/link'
import { Moon, Brain, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Людина лежить у ліжку вночі й не може заснути"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/10" />
        <div className="absolute inset-0 bg-slate-950/60 md:bg-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-indigo-400 rounded-full" />
            Безкоштовний тест — 3 хвилини
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Чому ви не можете спати —{' '}
            <span className="text-indigo-400">і що з цим робити</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            10 запитань — і ви дізнаєтесь свій тип безсоння, його причину,
            та конкретні кроки для повернення нормального сну.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/test"
              className="w-full sm:w-auto text-center bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-indigo-500/20"
            >
              Дізнатись свій тип безсоння →
            </Link>
            <p className="text-slate-400 text-sm">Без реєстрації. Безкоштовно.</p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-400" />
              <span>5 типів безсоння</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <span>Науково обґрунтовано</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Результат одразу</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
