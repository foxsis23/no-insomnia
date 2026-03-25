import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { CreateOrderRequest, CreateOrderResponse, PaymentFormData } from '@/types'
import { PRODUCTS } from '@/data/products'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function generateAccessToken(): string {
  return `tok_${Date.now()}_${Math.random().toString(36).slice(2, 16)}`
}

function generateHmacSignature(secretKey: string, ...fields: string[]): string {
  return createHmac('md5', secretKey).update(fields.join(';')).digest('hex')
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateOrderRequest = await req.json()
    const { productId, email, resultType } = body

    const product = PRODUCTS[productId]
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const orderId = generateOrderId()
    const accessToken = generateAccessToken()
    const orderDate = Math.floor(Date.now() / 1000).toString()

    const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT || 'demo_merchant'
    const merchantDomainName = process.env.NEXT_PUBLIC_SITE_URL || 'https://bezsonnya.net'
    const serviceUrl = `${merchantDomainName}/api/payment/callback`
    const returnUrl = `${merchantDomainName}/success?token=${accessToken}&product=${productId}`

    const merchantSignature = process.env.WAYFORPAY_SECRET_KEY
      ? generateHmacSignature(
          process.env.WAYFORPAY_SECRET_KEY,
          merchantAccount,
          merchantDomainName,
          orderId,
          orderDate,
          product.price.toString(),
          'UAH',
          product.name,
          '1',
          product.price.toString()
        )
      : 'stub_signature_replace_with_real'

    const formData: PaymentFormData = {
      merchantAccount,
      merchantDomainName,
      orderReference: orderId,
      orderDate,
      amount: product.price.toString(),
      currency: 'UAH',
      orderTimeout: '49000',
      productName: [product.name],
      productCount: ['1'],
      productPrice: [product.price.toString()],
      clientFirstName: '',
      clientLastName: '',
      clientEmail: email || '',
      clientPhone: '',
      merchantSignature,
      language: 'UA',
      returnUrl,
      serviceUrl
    }

    // Save order to Supabase
    const supabase = createSupabaseAdminClient()
    const { error: dbError } = await supabase.from('orders').insert({
      order_id: orderId,
      product_id: productId,
      amount: product.price,
      status: 'pending',
      email: email || null,
      result_type: resultType || null,
      access_token: accessToken
    })

    if (dbError) {
      console.error('[payment/create] db error:', dbError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    const response: CreateOrderResponse = {
      orderId,
      accessToken,
      formData,
      paymentUrl: 'https://secure.wayforpay.com/pay'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[payment/create] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
