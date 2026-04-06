import { apiClient } from './apiClient'

export interface ApiProduct {
  id: string
  siteId: string
  title: string
  description: string
  price: string
  videoUrl: string | null
  isActive: boolean
  order: number
  createdAt: string
}

export interface OrderStatus {
  id: string
  siteId: string
  productId: string
  customerEmail: string
  customerName: string
  customerPhone: string
  amount: string
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  createdAt: string
}

export interface EventSummary {
  event: string
  count: number
}

export interface UpdateProductRequest {
  title?: string
  description?: string
  price?: string
  videoUrl?: string
  isActive?: boolean
  order?: number
}

export interface CreateSessionResponse {
  sessionToken: string
  expiresAt: string
  productIds: string[]
}

// ── Public ────────────────────────────────────────────────────────────────────

export async function fetchProducts(): Promise<ApiProduct[]> {
  const data = await apiClient.get<ApiProduct[]>('/products')
  return Array.isArray(data) ? data : []
}

export async function fetchAllProductsAdmin(): Promise<ApiProduct[]> {
  const data = await apiClient.get<ApiProduct[]>('/products', {
    params: { includeInactive: 'true' },
  })
  return Array.isArray(data) ? data : []
}

export async function fetchProduct(id: string): Promise<ApiProduct> {
  return apiClient.get<ApiProduct>(`/products/${id}`)
}

export async function trackAnalyticsEvent(
  event: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await apiClient.post('/analytics/event', { event, metadata })
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function createSession(email: string): Promise<CreateSessionResponse> {
  const data = await apiClient.post<{
    session_token: string
    expires_at: string
    productIds: string[]
  }>('/auth/session', { email })
  return {
    sessionToken: data.session_token,
    expiresAt: data.expires_at,
    productIds: data.productIds ?? [],
  }
}

export async function fetchMe(token: string): Promise<string[]> {
  const data = await apiClient.get<{ product_ids: string[] }>('/auth/me', {
    token,
  })
  return Array.isArray(data.product_ids) ? data.product_ids : []
}

// ── Admin ─────────────────────────────────────────────────────────────────────

export async function updateProduct(
  id: string,
  adminKey: string,
  data: UpdateProductRequest,
): Promise<ApiProduct> {
  return apiClient.patch<ApiProduct>(`/products/${id}`, data, {
    headers: { 'x-admin-key': adminKey },
  })
}

export async function deleteProduct(id: string, adminKey: string): Promise<void> {
  await apiClient.delete(`/products/${id}`, {
    headers: { 'x-admin-key': adminKey },
  })
}

export async function fetchOrders(adminKey: string): Promise<OrderStatus[]> {
  return apiClient.get<OrderStatus[]>('/payments/orders', {
    headers: { 'x-admin-key': adminKey },
  })
}

export async function fetchAnalyticsSummary(
  adminKey: string,
  days = 30,
): Promise<EventSummary[]> {
  return apiClient.get<EventSummary[]>('/analytics/summary', {
    headers: { 'x-admin-key': adminKey },
    params: { days },
  })
}
