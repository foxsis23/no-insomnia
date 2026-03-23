export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  // Fire-and-forget: never blocks UI
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params)
    }
  } catch {
    // Analytics failures should never affect user experience
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
