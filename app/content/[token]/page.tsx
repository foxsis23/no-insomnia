import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/shared/Header'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { OrderRow, ProductRow } from '@/types'
import { PRODUCTS } from '@/data/products'

interface PageProps {
  params: Promise<{ token: string }>
}

async function getContent(token: string) {
  const supabase = createSupabaseAdminClient()

  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('access_token', token)
    .eq('status', 'paid')
    .single<OrderRow>()

  if (error || !order) return null

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', order.product_id)
    .single<ProductRow>()

  return { order, product }
}

export default async function ContentPage({ params }: PageProps) {
  const { token } = await params
  const data = await getContent(token)

  if (!data) notFound()

  const { order, product } = data
  const staticProduct = PRODUCTS[order.product_id]
  const name = product?.name || staticProduct?.name || order.product_id
  const description = product?.description || staticProduct?.description || ''
  const type = product?.type || staticProduct?.type || 'text'
  const tag = product?.tag || staticProduct?.tag || ''
  const contentUrl = product?.content_url || null

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 py-10">

          {/* Back */}
          <Link
            href="/my"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
          >
            ← Всі матеріали
          </Link>

          {/* Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6">
            <div className="flex items-center gap-2 mb-3">
              {tag && (
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {tag}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{name}</h1>
            {description && (
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            )}
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            {contentUrl ? (
              <ContentViewer url={contentUrl} type={type} name={name} />
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">⏳</div>
                <p className="font-medium text-slate-900 mb-2">Контент готується</p>
                <p className="text-sm text-slate-500 mb-6">
                  Матеріал буде доступний найближчим часом.
                  Якщо є питання — звертайтесь у Telegram.
                </p>
                <Link
                  href="https://t.me/bezsonnya_net"
                  target="_blank"
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                >
                  Telegram-підтримка
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  )
}

function ContentViewer({ url, type, name }: { url: string; type: string; name: string }) {
  if (type === 'audio') {
    return (
      <div>
        <p className="font-medium text-slate-900 mb-4">{name}</p>
        <audio
          controls
          className="w-full rounded-xl"
          src={url}
          preload="metadata"
        >
          Ваш браузер не підтримує аудіо.
        </audio>
        <p className="text-xs text-slate-400 mt-3 text-center">
          Слухайте в зручний для вас час. Без обмежень.
        </p>
      </div>
    )
  }

  if (type === 'video') {
    // Support YouTube, Vimeo embed URLs or direct video
    const isEmbed = url.includes('youtube.com/embed') || url.includes('player.vimeo.com')

    return (
      <div>
        <p className="font-medium text-slate-900 mb-4">{name}</p>
        {isEmbed ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={url}
              className="absolute inset-0 w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            controls
            className="w-full rounded-xl"
            src={url}
            preload="metadata"
          >
            Ваш браузер не підтримує відео.
          </video>
        )}
        <p className="text-xs text-slate-400 mt-3 text-center">
          Довічний доступ до матеріалу.
        </p>
      </div>
    )
  }

  // text — external link
  return (
    <div className="text-center">
      <p className="font-medium text-slate-900 mb-2">{name}</p>
      <p className="text-slate-500 text-sm mb-6">Ваш матеріал готовий для перегляду.</p>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl transition-colors"
      >
        Відкрити матеріал →
      </Link>
    </div>
  )
}
