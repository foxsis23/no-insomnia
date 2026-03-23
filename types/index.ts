export type ResultType =
  | 'tense_falling_asleep'
  | 'night_waking'
  | 'early_rising'
  | 'broken_sleep'
  | 'anxiety_before_sleep'

export interface Answer {
  text: string
  weights: Partial<Record<ResultType, number>>
}

export interface Question {
  id: number
  text: string
  answers: Answer[]
}

export interface ResultData {
  type: ResultType
  title: string
  emoji: string
  shortText: string
  fullText: string
  recommendations: string[]
  upsellProducts: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  type: 'text' | 'audio' | 'video'
  tag?: string
}

export interface Order {
  id: string
  orderId: string
  productId: string
  amount: number
  status: 'pending' | 'paid' | 'failed'
  email?: string
  resultType?: ResultType
  accessToken: string
  createdAt: string
  paidAt?: string
}

export interface PaymentFormData {
  merchantAccount: string
  merchantDomainName: string
  orderReference: string
  orderDate: string
  amount: string
  currency: string
  orderTimeout: string
  productName: string[]
  productCount: string[]
  productPrice: string[]
  clientFirstName: string
  clientLastName: string
  clientEmail: string
  clientPhone: string
  merchantSignature: string
  language: string
  returnUrl: string
  serviceUrl: string
}

export interface CreateOrderRequest {
  productId: string
  email?: string
  resultType?: ResultType
}

export interface CreateOrderResponse {
  orderId: string
  accessToken: string
  formData: PaymentFormData
  paymentUrl: string
}
