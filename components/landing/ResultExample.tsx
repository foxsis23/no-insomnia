import Link from 'next/link'

export default function ResultExample() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Приклад результату</h2>
          <p className="text-slate-500 text-lg">Ось що ви отримаєте після тесту</p>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden max-w-2xl mx-auto">
          {/* Free part */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">😰</div>
              <div>
                <div className="text-xs font-medium text-indigo-500 uppercase tracking-wide mb-1">Ваш тип безсоння</div>
                <div className="text-xl font-bold text-slate-900">Передсонна тривога</div>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Ваш головний ворог — не сам сон, а очікування сну. Ви починаєте хвилюватись ще вдень про те,
              як виспитесь. Ліжко стало тригером тривоги. Це «умовна безсоння» — найбільш вивчений тип,
              і він добре піддається лікуванню.
            </p>
          </div>

          {/* Paywall blur */}
          <div className="relative">
            <div className="p-8 blur-sm select-none">
              <h3 className="font-semibold text-slate-900 mb-3">Чому це відбувається</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Передсонна тривога — це класичний умовний рефлекс за Павловим. Колись ви погано поспали →
                пережили неприємні наслідки → мозок запам'ятав: «ліжко = небезпека»...
              </p>
              <h3 className="font-semibold text-slate-900 mb-3">Три головних кроки для вашого типу</h3>
              <p className="text-slate-600 text-sm">1. Парадоксальний намір...</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white flex flex-col items-center justify-end pb-8">
              <p className="text-slate-600 text-sm mb-4 px-6 text-center">
                Повний розбір + план дій на 7 днів за <strong>29 грн</strong>
              </p>
              <Link
                href="/test"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
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
