import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

function verifyCallbackSignature(body: Record<string, string>, secretKey: string): boolean {
  // WayForPay callback signature fields (in order)
  const fields = [
    body.merchantAccount,
    body.orderReference,
    body.amount,
    body.currency,
    body.authCode,
    body.cardPan,
    body.transactionStatus,
    body.reasonCode
  ]
  const expected = createHmac('md5', secretKey).update(fields.join(';')).digest('hex')
  return expected === body.merchantSignature
}

function generateResponseSignature(
  orderReference: string,
  status: string,
  time: number,
  secretKey: string
): string {
  return createHmac('md5', secretKey)
    .update([orderReference, status, time].join(';'))
    .digest('hex')
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { orderReference, transactionStatus, merchantSignature } = body

    // Verify signature if secret key is configured
    const secretKey = process.env.WAYFORPAY_SECRET_KEY
    if (secretKey && merchantSignature) {
      const valid = verifyCallbackSignature(body, secretKey)
      if (!valid) {
        console.error('[payment/callback] invalid signature for order:', orderReference)
        return NextResponse.json({ status: 'error', message: 'Invalid signature' }, { status: 400 })
      }
    }

    // Update order status in DB
    if (orderReference) {
      const supabase = createSupabaseAdminClient()
      const isPaid = transactionStatus === 'Approved'

      const { error: dbError } = await supabase
        .from('orders')
        .update({
          status: isPaid ? 'paid' : 'failed',
          paid_at: isPaid ? new Date().toISOString() : null,
          wayforpay_reference: body.recToken || orderReference
        })
        .eq('order_id', orderReference)

      if (dbError) {
        console.error('[payment/callback] db error:', dbError)
      }
    }

    // WayForPay requires this exact response format
    const time = Math.floor(Date.now() / 1000)
    const status = 'accept'
    const signature = secretKey
      ? generateResponseSignature(orderReference || 'unknown', status, time, secretKey)
      : 'stub_response_signature'

    return NextResponse.json({
      orderReference: orderReference || 'unknown',
      status,
      time,
      signature
    })
  } catch (error) {
    console.error('[payment/callback] error:', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
