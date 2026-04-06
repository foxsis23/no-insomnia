import { CreateOrderRequest, CreateOrderResponse, ResultType } from '@/types'
import { PRODUCTS } from '@/data/products'
import { trackAnalyticsEvent } from '@/lib/api'

// Payment is intentionally not wired to the real backend yet — stubbed client-side.
export async function createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
  const orderId = `stub_${Date.now()}`
  const accessToken = `tok_${Math.random().toString(36).slice(2)}`
  const product = PRODUCTS[req.productId]
  const amount = product?.price ?? 0

  return {
    orderId,
    accessToken,
    formData: {
      merchantAccount: 'stub',
      merchantDomainName: 'bezsonnia.net',
      orderReference: orderId,
      orderDate: String(Math.floor(Date.now() / 1000)),
      amount: String(amount),
      currency: 'UAH',
      orderTimeout: '49000',
      productName: [product?.name ?? req.productId],
      productCount: ['1'],
      productPrice: [String(amount)],
      clientFirstName: '',
      clientLastName: '',
      clientEmail: req.email ?? '',
      clientPhone: '',
      merchantSignature: 'stub',
      language: 'UA',
      returnUrl: '/success',
      serviceUrl: '/success',
    },
    paymentUrl: '/success?token=' + accessToken + '&product=' + req.productId,
  }
}

export async function saveTestResult(
  sessionId: string,
  resultType: ResultType,
  answers: number[],
): Promise<void> {
  await trackAnalyticsEvent('complete_test', {
    sessionId,
    resultType,
    answers,
  }).catch(() => {})
}

export async function getOrderByToken(_token: string) {
  return null
}

export function getMockProductContent(productId: string): string {
  const product = PRODUCTS[productId]
  if (!product) return ''
  return `# ${product.name}\n\nДякуємо за покупку! Матеріал доступний у розділі «Мої матеріали».`
}
