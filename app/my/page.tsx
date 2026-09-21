'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import Header from '@/components/shared/Header'
import { createSession, fetchMe, requestLoginCode } from '@/lib/api'
import { useProducts } from '@/lib/queries'
import { useSessionStore, isSessionValid } from '@/lib/sessionStore'

export default function MyPage() {
  const sessionToken = useSessionStore((s) => s.sessionToken)
  const sessionExpiresAt = useSessionStore((s) => s.sessionExpiresAt)
  const purchasedProductIds = useSessionStore((s) => s.purchasedProductIds)
  const setSession = useSessionStore((s) => s.setSession)
  const clearSession = useSessionStore((s) => s.clearSession)

  const { data: products = [] } = useProducts()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  // Вхід у два кроки: пошта → код із листа.
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [code, setCode] = useState('')

  // Перехід із бота: ?token=… — вхід без пошти, посилання вже підтверджує оплату.
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (!token) return

    let cancelled = false
    fetchMe(token)
      .then((ids) => {
        if (cancelled) return
        const month = new Date()
        month.setDate(month.getDate() + 30)
        setSession(token, month.toISOString(), ids)
        setSearched(true)
      })
      .catch(() => {
        if (!cancelled) setError('Посилання застаріло. Введіть пошту, яку вказували при оплаті.')
      })
      .finally(() => {
        if (!cancelled) {
          window.history.replaceState(null, '', '/my')
        }
      })
    return () => {
      cancelled = true
    }
  }, [setSession])

  const hasValidSession = isSessionValid(sessionToken, sessionExpiresAt)
  const purchased = products.filter((p) => purchasedProductIds.includes(p.id))

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      await requestLoginCode(email.trim())
      setStep('code')
    } catch {
      setError('Щось пішло не так. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirmCode(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setError('')
    try {
      const session = await createSession(email.trim(), code.trim())
      setSession(session.sessionToken, session.expiresAt, session.productIds)
      setSearched(true)
      setStep('email')
      setCode('')
    } catch {
      setError('Код не підійшов. Перевірте лист або запросіть новий.')
    } finally {
      setLoading(false)
    }
  }

  const showEmailForm = !hasValidSession || purchasedProductIds.length === 0

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-white mb-2">Мої матеріали</h1>
          <p className="text-slate-400 text-sm mb-8">
            Введіть пошту, яку вказували при оплаті — надішлемо код для входу.
          </p>

          {showEmailForm && step === 'email' && (
            <form onSubmit={handleSendCode} className="flex gap-3 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/5"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                {loading ? 'Надсилаємо…' : 'Надіслати код'}
              </button>
            </form>
          )}

          {showEmailForm && step === 'code' && (
            <form onSubmit={handleConfirmCode} className="mb-6">
              <p className="text-slate-300 text-sm mb-3">
                Якщо за поштою <span className="text-white">{email}</span> є покупки — код уже
                в листі. Він дійсний 15 хвилин.
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  required
                  className="flex-1 border border-white/10 rounded-xl px-4 py-3 text-sm tracking-[0.4em] text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/5"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  {loading ? 'Входимо…' : 'Увійти'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('email')
                  setCode('')
                  setError('')
                }}
                className="text-slate-500 hover:text-slate-300 text-xs mt-3"
              >
                Змінити пошту
              </button>
            </form>
          )}

          {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

          {searched && purchasedProductIds.length === 0 && (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-10 text-center">
              <p className="text-slate-400 text-sm mb-1">Покупок не знайдено</p>
              <p className="text-slate-500 text-xs">
                Перевірте email або{' '}
                <Link
                  href="https://t.me/bezsonnya_net"
                  target="_blank"
                  className="text-indigo-400 underline"
                >
                  зверніться до підтримки
                </Link>
              </p>
            </div>
          )}

          {purchased.length > 0 && (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">
                Знайдено {purchased.length} покупок
              </p>
              {purchased.map((p) => (
                <div
                  key={p.id}
                  className="bg-white/5 rounded-2xl border border-white/10 p-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-indigo-400" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{p.description}</p>
                  </div>
                  <Link
                    href={`/content/${sessionToken}?product=${p.id}`}
                    className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Переглянути →
                  </Link>
                </div>
              ))}
              <button
                onClick={clearSession}
                className="text-slate-500 hover:text-slate-300 text-xs"
              >
                Використати інший email
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
