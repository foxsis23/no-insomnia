'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Moon,
  AlarmClock,
  Wind,
  ClipboardList,
  Sparkles,
  GraduationCap,
  FileText,
  type LucideIcon,
} from 'lucide-react'
import { Product } from '@/types'
import { createOrder } from '@/lib/stubs'
import { trackEvent } from '@/lib/analytics'
import { useProducts } from '@/lib/queries'

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  sleep_reason: FileText,
  night_support_fall_asleep: Moon,
  night_support_woke_up: AlarmClock,
  night_support_before_sleep: Wind,
  sleep_return_protocol: ClipboardList,
  sleep_7_nights_recovery: Sparkles,
  course: GraduationCap,
}

export default function OfferContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product') || 'sleep_reason'
  const { data: products, isLoading: loading } = useProducts()
  const product: Product | null = useMemo(() => {
    const found = products?.find((p) => p.id === productId)
    if (!found) return null
    return {
      id: found.id,
      name: found.title,
      description: found.description,
      price: Number(found.price),
      type: 'text',
      tag: undefined,
    }
  }, [products, productId])
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePurchase() {
    if (!product) return
    setIsLoading(true)
    setError('')
    trackEvent('offer_purchase_click', { product_id: productId })

    try {
      const order = await createOrder({ productId: product.id, email: email || undefined })

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-400 text-sm">Завантаження…</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-500">Продукт не знайдено або недоступний</p>
      </div>
    )
  }

  const Icon = PRODUCT_ICONS[product.id] || FileText

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-600" strokeWidth={1.75} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-4 mb-3">{product.name}</h1>
        <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

        <div className="border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-slate-600">Вартість:</span>
            <span className="text-3xl font-bold text-slate-900">{product.price} грн</span>
          </div>

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
            {isLoading ? 'Зачекайте…' : `Придбати за ${product.price} грн`}
          </button>

          <p className="text-center text-xs text-slate-400 mt-3">
            Безпечна оплата через WayForPay. Миттєвий доступ після оплати.
          </p>
        </div>
      </div>
    </div>
  )
}
