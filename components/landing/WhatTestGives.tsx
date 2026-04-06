import { Search, Dna, ClipboardList, Ban, type LucideIcon } from 'lucide-react'

const benefits: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Search,
    title: 'Ваш точний тип безсоння',
    description: 'Не загальні поради, а розбір саме вашої ситуації — чому саме ви не спите.'
  },
  {
    Icon: Dna,
    title: 'Механізм: що відбувається в мозку',
    description: 'Пояснення на рівні нервової системи — без медичного жаргону, зрозумілою мовою.'
  },
  {
    Icon: ClipboardList,
    title: 'Конкретний план дій',
    description: '3 перевірені кроки, що підходять саме вашому типу. Не «порадьтесь з лікарем».'
  },
  {
    Icon: Ban,
    title: 'Що НЕ робити',
    description: 'Типові помилки, які підсилюють ваш тип безсоння — і як їх уникнути.'
  }
]

export default function WhatTestGives() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Що ви отримаєте після тесту</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Тест визначає один із 5 типів безсоння і дає персоналізований розбір
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map(({ Icon, title, description }) => (
            <div key={title} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-indigo-600" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
