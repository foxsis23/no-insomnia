'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SessionState {
  sessionToken: string | null
  sessionExpiresAt: string | null
  purchasedProductIds: string[]
}

interface SessionActions {
  setSession: (
    token: string,
    expiresAt: string,
    productIds: string[],
  ) => void
  clearSession: () => void
  setProductIds: (ids: string[]) => void
}

export const useSessionStore = create<SessionState & SessionActions>()(
  persist(
    (set) => ({
      sessionToken: null,
      sessionExpiresAt: null,
      purchasedProductIds: [],

      setSession: (token, expiresAt, productIds) =>
        set({
          sessionToken: token,
          sessionExpiresAt: expiresAt,
          purchasedProductIds: productIds,
        }),

      clearSession: () =>
        set({
          sessionToken: null,
          sessionExpiresAt: null,
          purchasedProductIds: [],
        }),

      setProductIds: (ids) => set({ purchasedProductIds: ids }),
    }),
    {
      name: 'session-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
          length: 0,
          clear: () => {},
          key: () => null,
        } as Storage
      }),
    },
  ),
)

export function isSessionValid(
  token: string | null,
  expiresAt: string | null,
): boolean {
  return !!token && !!expiresAt && new Date(expiresAt) > new Date()
}
