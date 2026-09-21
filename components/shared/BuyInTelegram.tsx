'use client'

import { Send } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/** Бот, у якому відбувається оплата. Матеріали після неї відкриваються і тут. */
export const BOT_USERNAME = 'bezsonnya_net_bot'

export function telegramBuyUrl(productId: string): string {
  return `https://t.me/${BOT_USERNAME}?start=${productId}`
}

interface Props {
  productId: string
  price: number
  label?: string
  /** Другорядний вигляд — для блоків, де кнопка не головна дія. */
  subtle?: boolean
}

export default function BuyInTelegram({ productId, price, label, subtle }: Props) {
  return (
    <div>
      <a
        href={telegramBuyUrl(productId)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('telegram_buy_click', { productId })}
        className={`flex items-center justify-center gap-2 w-full font-semibold py-4 rounded-xl transition-colors text-lg ${
          subtle
            ? 'border border-white/15 hover:border-white/30 text-white'
            : 'bg-indigo-500 hover:bg-indigo-400 text-white'
        }`}
      >
        <Send className="w-5 h-5" strokeWidth={2} />
        {label ?? `Придбати — ${price} грн`}
      </a>
      <p className="text-center text-xs text-slate-500 mt-3">
        Оплата проходить у Telegram. Доступ відкриється одразу — і в боті, і тут на сайті.
      </p>
    </div>
  )
}
