'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

// TODO: підтвердити посилання на бота для безсоння
const BOT_LINK = 'https://t.me/gss_sofia_bot?start=partner_bezsonnya'
const BOT_NAME = 'Софія'
const SHOW_AFTER_PX = 600

export default function FloatingBot() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={BOT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('click_bot_floating')}
      aria-label={`Поговорити з ${BOT_NAME}`}
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
      }`}
    >
      <span className="bot-float flex items-center gap-3 rounded-full bg-slate-900 ring-1 ring-indigo-500/40 shadow-lg shadow-black/50 pl-2 pr-4 py-2">
        <span className="relative shrink-0">
          <Image
            src="/images/sofia-avatar.webp"
            alt=""
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-slate-900 animate-pulse" />
        </span>
        <span className="hidden sm:block text-sm font-semibold text-white whitespace-nowrap">
          Поговорити з {BOT_NAME}
        </span>
      </span>
    </a>
  )
}
