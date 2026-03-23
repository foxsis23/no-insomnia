import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()

    console.log('[payment/callback] received:', body)

    // In production: verify HMAC signature, update order status in DB
    // For now: log and return approval
    const { orderReference } = body

    // WayForPay expects this response format
    const response = {
      orderReference: orderReference || 'unknown',
      status: 'accept',
      time: Math.floor(Date.now() / 1000),
      signature: 'stub_response_signature'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[payment/callback] error:', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
