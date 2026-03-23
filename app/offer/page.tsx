import { Suspense } from 'react'
import Header from '@/components/shared/Header'
import OfferContent from './OfferContent'

export default function OfferPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <Suspense fallback={
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <OfferContent />
        </Suspense>
      </main>
    </>
  )
}
