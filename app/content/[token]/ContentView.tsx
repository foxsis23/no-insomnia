'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/shared/Header'
import { fetchMe } from '@/lib/api'
import { useProducts } from '@/lib/queries'
import { PRODUCT_CONTENT } from '@/data/productContent'

interface Props {
  token: string
  productId: string | null
}

export default function ContentView({ token, productId }: Props) {
  const { data: products = [], isLoading: productsLoading } = useProducts()
  const [allowed, setAllowed] = useState<string[]>([])
  const [meLoading, setMeLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchMe(token)
      .then((ids) => {
        if (!cancelled) setAllowed(ids)
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message || 'Помилка доступу')
      })
      .finally(() => {
        if (!cancelled) setMeLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [token])

  const loading = productsLoading || meLoading

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50">
          <div className="max-w-2xl mx-auto px-4 py-10">
            <p className="text-red-500 text-sm">{error}</p>
            <Link href="/my" className="text-indigo-500 text-sm underline">
              ← До моїх матеріалів
            </Link>
          </div>
        </main>
      </>
    )
  }

  const visibleIds = allowed.filter(
    (id) => !productId || id === productId,
  )
  const visibleProducts = products.filter((p) => visibleIds.includes(p.id))

  if (visibleProducts.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50">
          <div className="max-w-2xl mx-auto px-4 py-10">
            <p className="text-slate-500 text-sm mb-4">
              Доступних матеріалів не знайдено.
            </p>
            <Link href="/my" className="text-indigo-500 text-sm underline">
              ← Всі матеріали
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <Link
            href="/my"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
          >
            ← Всі матеріали
          </Link>

          {visibleProducts.map((p) => {
            const content = PRODUCT_CONTENT[p.id]
            return (
              <article
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 mb-6"
              >
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  {content?.title || p.title}
                </h1>
                <p className="text-slate-500 text-sm mb-6">{p.description}</p>

                {p.videoUrl && (
                  <div
                    className="relative w-full mb-6"
                    style={{ paddingBottom: '56.25%' }}
                  >
                    <iframe
                      src={p.videoUrl}
                      className="absolute inset-0 w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {content ? (
                  <div className="prose prose-slate max-w-none">
                    {content.sections.map((s, i) => (
                      <div key={i} className="mb-5">
                        {s.heading && (
                          <h3 className="font-semibold text-slate-900 mb-2">
                            {s.heading}
                          </h3>
                        )}
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                          {s.body}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">Матеріал готується.</p>
                )}
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}
