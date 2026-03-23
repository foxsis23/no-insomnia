import { NextRequest, NextResponse } from 'next/server'
import { PRODUCTS } from '@/data/products'

interface RouteParams {
  params: Promise<{ token: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { token } = await params

    // In production: look up order by access_token in DB
    // Stub: return mock order
    if (!token || !token.startsWith('token_')) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const mockOrder = {
      id: `mock_order_${token}`,
      accessToken: token,
      productId: 'sleep_reason',
      amount: PRODUCTS.sleep_reason.price,
      status: 'paid',
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(mockOrder)
  } catch (error) {
    console.error('[orders/token] error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
