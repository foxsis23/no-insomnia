import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import LegalDocument from '@/components/shared/LegalDocument'
import { PRIVACY_BLOCKS } from '@/data/legal/privacy'

export const metadata: Metadata = {
  title: 'Політика конфіденційності — безсоння.net',
  description: 'Порядок збору, обробки, зберігання та захисту персональних даних користувачів сайту.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-950 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-white mb-8">Політика конфіденційності</h1>
          <LegalDocument blocks={PRIVACY_BLOCKS} />
        </div>
      </main>
    </>
  )
}
