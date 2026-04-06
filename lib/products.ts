import { PRODUCTS, UPSELL_PRODUCTS } from '@/data/products'
import { Product } from '@/types'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apimedsys.com.ua'
const SITE_HOST =
  process.env.NEXT_PUBLIC_SITE_HOST || 'no-insomnia.net'

interface ApiProductRaw {
  id: string
  title: string
  description: string
  price: string
  videoUrl: string | null
  isActive: boolean
  order: number
}

function mergeWithStatic(api: ApiProductRaw): Product {
  const staticProduct = PRODUCTS[api.id]
  return {
    id: api.id,
    name: api.title,
    description: api.description,
    price: Number(api.price),
    // API doesn't store type/tag — inherit from static catalog, fallback to 'text'
    type: staticProduct?.type ?? 'text',
    tag: staticProduct?.tag,
  }
}

// Cache per request (Next.js revalidates via cache tag)
async function fetchApiProducts(): Promise<ApiProductRaw[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      headers: { 'x-forwarded-host': SITE_HOST },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = (await res.json()) as
      | { success: boolean; data?: ApiProductRaw[]; error?: string }
      | ApiProductRaw[]
    if (Array.isArray(json)) return json
    if (json && json.success && Array.isArray(json.data)) return json.data
    return null
  } catch {
    return null
  }
}

export async function getActiveProducts(): Promise<Product[]> {
  const api = await fetchApiProducts()
  if (!api || api.length === 0) return Object.values(PRODUCTS)
  return api
    .filter((p) => p.isActive)
    .sort((a, b) => a.order - b.order)
    .map(mergeWithStatic)
}

export async function getProduct(id: string): Promise<Product | null> {
  const all = await getActiveProducts()
  return all.find((p) => p.id === id) ?? PRODUCTS[id] ?? null
}

export async function getUpsellProducts(excludeId?: string): Promise<Product[]> {
  const all = await getActiveProducts()
  return all.filter((p) => p.id !== 'sleep_reason' && p.id !== excludeId)
}

export async function getUpsellProductsOrdered(
  excludeId?: string,
): Promise<Product[]> {
  const all = await getActiveProducts()
  const activeIds = new Set(all.map((p) => p.id))
  // Preserve the static UPSELL_PRODUCTS order, but use live data where available
  return UPSELL_PRODUCTS
    .filter((p) => activeIds.has(p.id) && p.id !== excludeId)
    .map((p) => all.find((a) => a.id === p.id) ?? p)
}
