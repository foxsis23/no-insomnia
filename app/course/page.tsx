'use client'

import { useState } from 'react'
import Header from '@/components/shared/Header'
import { createOrder } from '@/lib/stubs'
import { trackEvent } from '@/lib/analytics'

const modules = [
  { title: 'Як працює сон', description: 'Архітектура сну, цикли, фази. Чому ви прокидаєтесь розбитим.' },
  { title: 'Ваш хронотип', description: 'Жайворонок чи сова — і як це впливає на режим.' },
  { title: '5 типів безсоння', description: 'Детальний розбір кожного типу з механізмами.' },
  { title: 'КПТ-I основи', description: 'Когнітивно-поведінкова терапія безсоння — золотий стандарт лікування.' },
  { title: 'Протоколи відновлення', description: 'Покроковий план для вашого типу з щоденними практиками.' },
  { title: 'Стрес і сон', description: 'Як кортизол руйнує сон і як це зупинити.' },
  { title: 'Харчування та сон', description: 'Що їсти і чого уникати для покращення якості сну.' },
  { title: 'Довгострокова підтримка', description: 'Як підтримувати нормальний сон після відновлення.' }
]

export default function CoursePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePurchase() {
    setIsLoading(true)
    setError('')
    trackEvent('course_purchase_click')

    try {
      const order = await createOrder({ productId: 'course', email: email || undefined })

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = order.paymentUrl

      Object.entries(order.formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = v
            form.appendChild(input)
          })
        } else {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = String(value)
          form.appendChild(input)
        }
      })

      document.body.appendChild(form)
      form.submit()
    } catch {
      setError('Виникла помилка. Спробуйте ще раз.')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-slate-50 py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              🎓 Відеокурс
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Сон без таблеток</h1>
            <p className="text-xl text-slate-600 mb-4">
              Повний курс від лікаря-сомнолога. 8 модулів, 40+ відеоуроків.
            </p>
            <div className="text-4xl font-bold text-slate-900">590 грн</div>
            <p className="text-slate-500 text-sm mt-1">Довічний доступ</p>
          </div>
        </section>

        {/* Modules */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Програма курсу</h2>
            <div className="space-y-3">
              {modules.map((mod, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{mod.title}</div>
                    <div className="text-slate-500 text-sm mt-0.5">{mod.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Purchase */}
        <section className="py-10 px-4 pb-20">
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="font-bold text-slate-900 text-xl mb-6 text-center">Отримати курс</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (необов'язково)"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm mb-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
            >
              {isLoading ? 'Зачекайте…' : 'Придбати курс — 590 грн'}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              Безпечна оплата. Довічний доступ до матеріалів.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
