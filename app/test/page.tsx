import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import TestFlow from '@/components/test/TestFlow'

export const metadata: Metadata = {
  title: 'Тест безсоння — безсоння.net',
  description: 'Пройдіть тест з 10 запитань і дізнайтесь свій тип безсоння.',
}

export default function TestPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Тест типу безсоння</h1>
            <p className="text-slate-500 text-sm">10 запитань · ~3 хвилини · Результат одразу</p>
          </div>
          <TestFlow />
        </div>
      </main>
    </>
  )
}
