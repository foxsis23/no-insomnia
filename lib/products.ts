import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { PRODUCTS, UPSELL_PRODUCTS } from '@/data/products'
import { Product, ProductRow } from '@/types'

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    price: Number(row.price),
    type: row.type,
    tag: row.tag || undefined
  }
}

// Server-side: fetch active products from Supabase, fallback to static data
export async function getActiveProducts(): Promise<Product[]> {
  try {
    const supabase = createSupabaseAdminClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('price', { ascending: true })

    if (error || !data?.length) return Object.values(PRODUCTS)
    return data.map(rowToProduct)
  } catch {
    return Object.values(PRODUCTS)
  }
}

// Server-side: get single active product by id
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const supabase = createSupabaseAdminClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single<ProductRow>()

    if (error || !data) return PRODUCTS[id] || null
    return rowToProduct(data)
  } catch {
    return PRODUCTS[id] || null
  }
}

// Server-side: get upsell products (all active except sleep_reason)
export async function getUpsellProducts(excludeId?: string): Promise<Product[]> {
  const all = await getActiveProducts()
  return all.filter((p) => p.id !== 'sleep_reason' && p.id !== excludeId)
}

// Server-side: get active upsell products matching static UPSELL_PRODUCTS order
export async function getUpsellProductsOrdered(excludeId?: string): Promise<Product[]> {
  const all = await getActiveProducts()
  const activeIds = new Set(all.map((p) => p.id))
  return UPSELL_PRODUCTS
    .filter((p) => activeIds.has(p.id) && p.id !== excludeId)
    .map((p) => all.find((a) => a.id === p.id) || p)
}
