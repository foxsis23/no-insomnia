import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import LegalDocument from '@/components/shared/LegalDocument'
import { TERMS_BLOCKS } from '@/data/legal/terms'

export const metadata: Metadata = {
  title: 'Публічна оферта — безсоння.net',
  description: 'Публічна оферта (договір приєднання) про надання інформаційно-освітніх послуг.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-white mb-8">Публічна оферта</h1>
          <LegalDocument blocks={TERMS_BLOCKS} />
        </div>
      </main>
    </>
  )
}
