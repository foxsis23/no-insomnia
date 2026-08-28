import { NextResponse } from 'next/server'
import { COURSE_VIDEOS, COURSE_PRODUCT_ID } from '@/data/courseVideos'
import { isBunnyConfigured, signedEmbedUrl } from '@/lib/bunny'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apimedsys.com.ua'
const SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST || 'no-insomnia.net'

/** Перевіряємо оплату на сервері — клієнту не можна довіряти в цьому питанні. */
async function paidProductIds(token: string): Promise<string[]> {
  const res = await fetch(new URL('auth/me', API_BASE_URL + '/'), {
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-host': SITE_HOST,
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) return []
  const json = (await res.json()) as
    | { success: boolean; data?: { product_ids?: string[] } }
    | { product_ids?: string[] }
  const payload = 'data' in json && json.data ? json.data : (json as { product_ids?: string[] })
  return Array.isArray(payload.product_ids) ? payload.product_ids : []
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Потрібен токен доступу' }, { status: 400 })
  }
  if (!isBunnyConfigured()) {
    return NextResponse.json({ error: 'Відеосховище не налаштоване' }, { status: 503 })
  }

  const paid = await paidProductIds(token)
  if (!paid.includes(COURSE_PRODUCT_ID)) {
    return NextResponse.json({ error: 'Курс не оплачено' }, { status: 403 })
  }

  // Підписуємо лише після підтвердженої оплати; посилання живуть кілька годин.
  const videos = COURSE_VIDEOS.filter((v) => v.id).map((v) => ({
    title: v.title,
    url: signedEmbedUrl(v.id),
  }))

  return NextResponse.json({ videos }, { headers: { 'Cache-Control': 'no-store' } })
}
