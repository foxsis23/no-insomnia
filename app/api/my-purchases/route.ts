import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { OrderRow, ProductRow } from '@/types'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const email = req.nextUrl.searchParams.get('email')?.toLowerCase().trim()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const supabase = createSupabaseAdminClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('email', email)
    .eq('status', 'paid')
    .order('paid_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }

  if (!orders?.length) {
    return NextResponse.json([])
  }

  // Fetch product details for all purchased products
  const productIds = [...new Set((orders as OrderRow[]).map((o) => o.product_id))]
  const { data: products } = await supabase
    .from('products')
    .select('id, name, description, type, tag, content_url')
    .in('id', productIds)

  const productMap = new Map<string, Pick<ProductRow, 'id' | 'name' | 'description' | 'type' | 'tag' | 'content_url'>>()
  for (const p of products || []) {
    productMap.set(p.id, p)
  }

  const result = (orders as OrderRow[]).map((order) => {
    const product = productMap.get(order.product_id)
    return {
      orderId: order.order_id,
      accessToken: order.access_token,
      productId: order.product_id,
      productName: product?.name || order.product_id,
      productDescription: product?.description || null,
      productType: product?.type || 'text',
      productTag: product?.tag || null,
      contentUrl: product?.content_url || null,
      amount: order.amount,
      paidAt: order.paid_at
    }
  })

  return NextResponse.json(result)
}
