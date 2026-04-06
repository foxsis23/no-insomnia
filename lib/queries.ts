'use client'

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchProducts,
  fetchAllProductsAdmin,
  fetchOrders,
  fetchAnalyticsSummary,
  updateProduct,
  deleteProduct,
  type UpdateProductRequest,
} from './api'

export const qk = {
  products: ['products'] as const,
  productsAdmin: ['products', 'admin'] as const,
  orders: (adminKey: string) => ['orders', adminKey] as const,
  analytics: (adminKey: string, days: number) =>
    ['analytics', adminKey, days] as const,
}

export function useProducts() {
  return useQuery({
    queryKey: qk.products,
    queryFn: fetchProducts,
  })
}

export function useProductsAdmin(enabled: boolean) {
  return useQuery({
    queryKey: qk.productsAdmin,
    queryFn: fetchAllProductsAdmin,
    enabled,
  })
}

export function useOrders(adminKey: string | null) {
  return useQuery({
    queryKey: qk.orders(adminKey || ''),
    queryFn: () => fetchOrders(adminKey as string),
    enabled: !!adminKey,
  })
}

export function useAnalyticsSummary(adminKey: string | null, days = 30) {
  return useQuery({
    queryKey: qk.analytics(adminKey || '', days),
    queryFn: () => fetchAnalyticsSummary(adminKey as string, days),
    enabled: !!adminKey,
  })
}

export function useUpdateProduct(adminKey: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: UpdateProductRequest
    }) => updateProduct(id, adminKey, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.products })
      qc.invalidateQueries({ queryKey: qk.productsAdmin })
    },
  })
}

export function useDeleteProduct(adminKey: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id, adminKey),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.products })
      qc.invalidateQueries({ queryKey: qk.productsAdmin })
    },
  })
}
