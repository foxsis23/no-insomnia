import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/shared/Header'
import { PRODUCTS } from '@/data/products'
import { getUpsellProductsOrdered } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Оплата успішна — безсоння.net',
  description: 'Дякуємо за покупку! Ваш контент готовий.',
}

interface SuccessPageProps {
  searchParams: Promise<{ token?: string; product?: string }>
}

interface OrderData {
  productId: string
  contentUrl: string | null
  productType: string | null
}

async function getOrderData(token: string): Promise<OrderData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/orders/${token}`, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const token = params.token
  const productId = params.product || 'sleep_reason'
  const product = PRODUCTS[productId]

  // Fetch real order data and upsell products in parallel
  const [orderData, upsellProducts] = await Promise.all([
    token ? getOrderData(token) : Promise.resolve(null),
    getUpsellProductsOrdered(productId)
  ])
  const contentUrl = orderData?.contentUrl || null
  const productType = orderData?.productType || product?.type || 'text'

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-10">
          {/* Success header */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-8">
            <div className="text-4xl mb-3">✅</div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Оплату отримано!</h1>
            <p className="text-slate-600 text-sm mb-4">
              Дякуємо за покупку. Ваш матеріал доступний нижче.
            </p>
            {token && (
              <div className="flex flex-col items-center gap-2">
                <Link
                  href={`/content/${token}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                >
                  Переглянути матеріал →
                </Link>
                <Link href="/my" className="text-xs text-slate-400 hover:text-indigo-500 transition-colors">
                  Всі мої покупки
                </Link>
              </div>
            )}
          </div>

          {/* Product content */}
          {product && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {product.tag}
                </span>
                <h2 className="font-bold text-slate-900">{product.name}</h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>

              <div className="bg-slate-50 rounded-xl p-6">
                {contentUrl ? (
                  <ContentBlock contentUrl={contentUrl} type={productType} />
                ) : (
                  <div className="text-sm text-slate-600">
                    <p className="font-medium text-slate-900 mb-3">Ваш матеріал готовий</p>
                    <p className="mb-4 leading-relaxed">
                      Контент буде доступний після додавання посилання адміністратором.
                      Зверніться до підтримки у Telegram.
                    </p>
                    <Link
                      href="https://t.me/bezsonnya_net"
                      target="_blank"
                      className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Telegram-підтримка
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Upsell */}
          {upsellProducts.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Продовжіть відновлення сну</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {upsellProducts
                .slice(0, 4)
                .map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {p.tag}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{p.price} грн</span>
                    </div>
                    <h4 className="font-medium text-slate-900 text-sm mb-1">{p.name}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-3">{p.description}</p>
                    <Link
                      href={p.id === 'course' ? '/course' : `/offer?product=${p.id}`}
                      className="text-center bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Придбати →
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          )}
        </div>
      </main>
    </>
  )
}

function ContentBlock({ contentUrl, type }: { contentUrl: string; type: string }) {
  if (type === 'audio') {
    return (
      <div>
        <p className="font-medium text-slate-900 mb-3 text-sm">Ваше аудіо готове</p>
        <audio controls className="w-full rounded-lg" src={contentUrl}>
          Ваш браузер не підтримує аудіо.
        </audio>
      </div>
    )
  }

  if (type === 'video') {
    return (
      <div>
        <p className="font-medium text-slate-900 mb-3 text-sm">Ваш курс готовий</p>
        <Link
          href={contentUrl}
          target="_blank"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Відкрити курс →
        </Link>
      </div>
    )
  }

  // text
  return (
    <div>
      <p className="font-medium text-slate-900 mb-3 text-sm">Ваш матеріал готовий</p>
      <Link
        href={contentUrl}
        target="_blank"
        className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
      >
        Відкрити матеріал →
      </Link>
    </div>
  )
}
