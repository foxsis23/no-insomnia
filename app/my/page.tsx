'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/shared/Header'

interface Purchase {
  orderId: string
  accessToken: string
  productId: string
  productName: string
  productDescription: string | null
  productType: 'text' | 'audio' | 'video'
  productTag: string | null
  contentUrl: string | null
  amount: number
  paidAt: string | null
}

const TYPE_ICON: Record<string, string> = {
  audio: '🎧',
  video: '🎓',
  text: '📄'
}

const TYPE_LABEL: Record<string, string> = {
  audio: 'Аудіо',
  video: 'Відео',
  text: 'Текст'
}

export default function MyPage() {
  const [email, setEmail] = useState('')
  const [purchases, setPurchases] = useState<Purchase[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    setSearched(false)

    try {
      const res = await fetch(`/api/my-purchases?email=${encodeURIComponent(email.trim())}`)
      if (!res.ok) throw new Error()
      const data: Purchase[] = await res.json()
      setPurchases(data)
      setSearched(true)
    } catch {
      setError('Щось пішло не так. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Мої матеріали</h1>
          <p className="text-slate-500 text-sm mb-8">
            Введіть email, який вказували при оплаті — і ми покажемо всі ваші покупки.
          </p>

          {/* Email form */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-10">
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

          {error && (
            <p className="text-red-500 text-sm mb-6">{error}</p>
          )}

          {/* Results */}
          {searched && (
            <>
              {!purchases?.length ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
                  <p className="text-slate-500 text-sm mb-1">Покупок не знайдено</p>
                  <p className="text-slate-400 text-xs">
                    Перевірте email або{' '}
                    <Link href="https://t.me/bezsonnya_net" target="_blank" className="text-indigo-500 underline">
                      зверніться до підтримки
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-500 text-sm">
                    Знайдено {purchases.length} {purchases.length === 1 ? 'покупку' : 'покупок'}
                  </p>
                  {purchases.map((p) => (
                    <PurchaseCard key={p.accessToken} purchase={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

function PurchaseCard({ purchase }: { purchase: Purchase }) {
  const hasContent = !!purchase.contentUrl

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Icon */}
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
        {TYPE_ICON[purchase.productType] || '📦'}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {purchase.productTag && (
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {purchase.productTag}
            </span>
          )}
          <span className="text-xs text-slate-400">
            {TYPE_LABEL[purchase.productType]}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-0.5">
          {purchase.productName}
        </h3>
        {purchase.paidAt && (
          <p className="text-xs text-slate-400">
            Придбано {new Date(purchase.paidAt).toLocaleDateString('uk-UA')}
          </p>
        )}
      </div>

      {/* Action */}
      <div className="flex-shrink-0">
        <Link
          href={`/content/${purchase.accessToken}`}
          className={`inline-block text-sm font-medium px-5 py-2.5 rounded-xl transition-colors ${
            hasContent
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-400 cursor-default pointer-events-none'
          }`}
        >
          {hasContent ? 'Переглянути →' : 'Незабаром'}
        </Link>
      </div>
    </div>
  )
}
