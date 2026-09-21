'use client'

import { Check } from 'lucide-react'
import { ResultType } from '@/types'
import { useProducts } from '@/lib/queries'
import BuyInTelegram from '@/components/shared/BuyInTelegram'

interface PaywallProps {
  resultType: ResultType
}

export default function Paywall({ resultType }: PaywallProps) {
  const { data: products } = useProducts()
  const price = Number(
    products?.find((p) => p.id === 'sleep_reason')?.price ?? 29,
  )
  return (
    <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 rounded-2xl border border-indigo-500/20 p-8 mt-6">
      <h2 className="text-xl font-bold text-white mb-2">Повний розбір вашого типу</h2>
      <p className="text-slate-300 mb-6 text-sm leading-relaxed">
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
          <li key={item} className="flex items-center gap-2 text-sm text-slate-200">
            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <BuyInTelegram
        productId="sleep_reason"
        price={price}
        label={`Отримати повний розбір — ${price} грн`}
      />

    </div>
  )
}
