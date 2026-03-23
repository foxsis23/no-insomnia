import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import ResultCard from '@/components/result/ResultCard'
import Paywall from '@/components/result/Paywall'
import PaidResult from '@/components/result/PaidResult'
import MedicalDisclaimer from '@/components/shared/MedicalDisclaimer'
import { RESULTS } from '@/data/results'
import { ResultType } from '@/types'

export const metadata: Metadata = {
  title: 'Ваш результат — безсоння.net',
  description: 'Ваш тип безсоння та персоналізований план дій.',
}

interface ResultPageProps {
  searchParams: Promise<{ type?: string; paid?: string }>
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams
  const type = params.type as ResultType
  const isPaid = params.paid === 'true'

  if (!type || !RESULTS[type]) {
    notFound()
  }

  const result = RESULTS[type]

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <ResultCard result={result} />

          {isPaid ? (
            <div className="mt-6">
              <PaidResult result={result} />
            </div>
          ) : (
            <Paywall resultType={type} />
          )}

          <div className="mt-8">
            <MedicalDisclaimer />
          </div>
        </div>
      </main>
    </>
  )
}
