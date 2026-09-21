'use client'

import { useMemo } from 'react'
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
import { useProducts } from '@/lib/queries'
import BuyInTelegram from '@/components/shared/BuyInTelegram'

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
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-500 text-sm">Завантаження…</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-400">Продукт не знайдено або недоступний</p>
      </div>
    )
  }

  const Icon = PRODUCT_ICONS[product.id] || FileText

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-400" strokeWidth={1.75} />
        </div>
        <h1 className="text-2xl font-bold text-white mt-4 mb-3">{product.name}</h1>
        <p className="text-slate-300 leading-relaxed mb-8">{product.description}</p>

        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-slate-300">Вартість:</span>
            <span className="text-3xl font-bold text-white">{product.price} грн</span>
          </div>

          <BuyInTelegram productId={product.id} price={product.price} />

        </div>
      </div>
    </div>
  )
}
