import Link from 'next/link'
import { HeartPulse } from 'lucide-react'

export default function ResultExample() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Приклад результату</h2>
          <p className="text-slate-400 text-lg">Ось що ви отримаєте після тесту</p>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden max-w-2xl mx-auto">
          {/* Free part */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-indigo-400" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-1">Ваш тип безсоння</div>
                <div className="text-xl font-bold text-white">Передсонна тривога</div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Ваш головний ворог — не сам сон, а очікування сну. Ви починаєте хвилюватись ще вдень про те,
              як виспитесь. Ліжко стало тригером тривоги. Це «умовна безсоння» — найбільш вивчений тип,
              і він добре піддається лікуванню.
            </p>
          </div>

          {/* Paywall blur */}
          <div className="relative">
            <div className="p-8 blur-sm select-none">
              <h3 className="font-semibold text-white mb-3">Чому це відбувається</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Передсонна тривога — це класичний умовний рефлекс за Павловим. Колись ви погано поспали →
                пережили неприємні наслідки → мозок запам'ятав: «ліжко = небезпека»...
              </p>
              <h3 className="font-semibold text-white mb-3">Три головних кроки для вашого типу</h3>
              <p className="text-slate-300 text-sm">1. Парадоксальний намір...</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 flex flex-col items-center justify-end pb-8">
              <p className="text-slate-300 text-sm mb-4 px-6 text-center">
                Повний розбір + план дій на 7 днів за <strong>29 грн</strong>
              </p>
              <Link
                href="/test"
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Пройти тест і отримати свій результат
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
