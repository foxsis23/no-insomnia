import { CreateOrderRequest, CreateOrderResponse, ResultType } from '@/types'
import { PRODUCTS } from '@/data/products'

export async function createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
  const response = await fetch('/api/payment/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req)
  })
  if (!response.ok) {
    throw new Error('Failed to create order')
  }
  return response.json()
}

export async function saveTestResult(sessionId: string, resultType: ResultType, answers: number[]): Promise<void> {
  await fetch('/api/test-result', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, resultType, answers })
  }).catch(() => {
    // Non-blocking — don't fail the test flow
  })
}

export async function getOrderByToken(token: string) {
  const response = await fetch(`/api/orders/${token}`)
  if (!response.ok) return null
  return response.json()
}

export function getMockProductContent(productId: string): string {
  const product = PRODUCTS[productId]
  if (!product) return ''

  return `# ${product.name}

Дякуємо за покупку! Ваш контент готовий.

> Це демо-версія контенту. Реальний контент буде доступний після інтеграції з CMS.

## Що входить у "${product.name}"

- Детальний розбір вашої ситуації
- Покрокові техніки та практики
- Підтримка протягом усього процесу
- Доступ до матеріалів без обмеження часу

Якщо виникли питання — напишіть нам.`
}
