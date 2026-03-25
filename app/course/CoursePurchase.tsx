'use client'

import { useState } from 'react'
import { createOrder } from '@/lib/stubs'
import { trackEvent } from '@/lib/analytics'

interface Props {
  price: number
}

export default function CoursePurchase({ price }: Props) {
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
        {isLoading ? 'Зачекайте…' : `Придбати курс — ${price} грн`}
      </button>
      <p className="text-center text-xs text-slate-400 mt-3">
        Безпечна оплата. Довічний доступ до матеріалів.
      </p>
    </div>
  )
}
