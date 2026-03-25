import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { OrderRow, ProductRow } from '@/types'

interface RouteParams {
  params: Promise<{ token: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { token } = await params

    if (!token) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const supabase = createSupabaseAdminClient()

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('access_token', token)
      .eq('status', 'paid')
      .single<OrderRow>()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Fetch product content_url
    const { data: product } = await supabase
      .from('products')
      .select('content_url, name, type')
      .eq('id', order.product_id)
      .single<Pick<ProductRow, 'content_url' | 'name' | 'type'>>()

    return NextResponse.json({
      id: order.id,
      accessToken: order.access_token,
      productId: order.product_id,
      amount: order.amount,
      status: order.status,
      createdAt: order.created_at,
      paidAt: order.paid_at,
      contentUrl: product?.content_url || null,
      productType: product?.type || null
    })
  } catch (error) {
    console.error('[orders/token] error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
