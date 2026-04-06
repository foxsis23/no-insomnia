'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import Header from '@/components/shared/Header'
import { createSession } from '@/lib/api'
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

  const hasValidSession = isSessionValid(sessionToken, sessionExpiresAt)
  const purchased = products.filter((p) => purchasedProductIds.includes(p.id))

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      const session = await createSession(email.trim())
      setSession(session.sessionToken, session.expiresAt, session.productIds)
      setSearched(true)
    } catch {
      setError('Щось пішло не так. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  const showEmailForm = !hasValidSession || purchasedProductIds.length === 0

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Мої матеріали</h1>
          <p className="text-slate-500 text-sm mb-8">
            Введіть email, який вказували при оплаті — і ми покажемо всі ваші покупки.
          </p>

          {showEmailForm && (
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
              >
                {loading ? 'Шукаємо…' : 'Знайти'}
              </button>
            </form>
          )}

          {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

          {searched && purchasedProductIds.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <p className="text-slate-500 text-sm mb-1">Покупок не знайдено</p>
              <p className="text-slate-400 text-xs">
                Перевірте email або{' '}
                <Link
                  href="https://t.me/bezsonnya_net"
                  target="_blank"
                  className="text-indigo-500 underline"
                >
                  зверніться до підтримки
                </Link>
              </p>
            </div>
          )}

          {purchased.length > 0 && (
            <div className="space-y-4">
              <p className="text-slate-500 text-sm">
                Знайдено {purchased.length} покупок
              </p>
              {purchased.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-indigo-600" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">{p.description}</p>
                  </div>
                  <Link
                    href={`/content/${sessionToken}?product=${p.id}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Переглянути →
                  </Link>
                </div>
              ))}
              <button
                onClick={clearSession}
                className="text-slate-400 hover:text-slate-600 text-xs"
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
