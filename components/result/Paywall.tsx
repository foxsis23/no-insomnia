'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { ResultType } from '@/types'
import { createOrder } from '@/lib/stubs'
import { trackEvent } from '@/lib/analytics'
import { useProducts } from '@/lib/queries'

interface PaywallProps {
  resultType: ResultType
}

export default function Paywall({ resultType }: PaywallProps) {
  const { data: products } = useProducts()
  const price = Number(
    products?.find((p) => p.id === 'sleep_reason')?.price ?? 29,
  )
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePurchase() {
    setIsLoading(true)
    setError('')
    trackEvent('paywall_click', { result_type: resultType })

    try {
      const order = await createOrder({ productId: 'sleep_reason', email: email || undefined, resultType })

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
    <div className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-2xl border border-indigo-100 p-8 mt-6">
      <h2 className="text-xl font-bold text-slate-900 mb-2">Повний розбір вашого типу</h2>
      <p className="text-slate-600 mb-6 text-sm leading-relaxed">
        Детальне пояснення, чому саме з вами це відбувається — і конкретний план дій на 7 днів.
      </p>

      <ul className="space-y-2 mb-6">
        {[
          'Механізм вашого типу безсоння',
          'Що відбувається в мозку та нервовій системі',
          '3 перевірених кроки для вашого типу',
          'Що НЕ робити (типові помилки)',
          'Персональний план на 7 днів'
        ].map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
            <Check className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (необов'язково) — отримати на пошту"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
      >
        {isLoading ? 'Зачекайте…' : `Отримати повний розбір — ${price} грн`}
      </button>

      <p className="text-center text-xs text-slate-400 mt-3">
        Безпечна оплата через WayForPay. Миттєвий доступ після оплати.
      </p>
    </div>
  )
}
