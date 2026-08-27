import type { Metadata } from 'next'
import Header from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'Контакти — безсоння.net',
}

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-950 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-white mb-8">Контакти</h1>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 space-y-6">
            <div>
              <h2 className="font-semibold text-white mb-2">Підтримка</h2>
              <p className="text-slate-300 text-sm">
                Для запитів щодо продуктів, технічних проблем або повернення коштів:
              </p>
              <a
                href="mailto:support@bezsonnya.net"
                className="text-indigo-400 hover:text-indigo-400 text-sm font-medium mt-1 block"
              >
                support@bezsonnya.net
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-white mb-2">Telegram</h2>
              <p className="text-slate-300 text-sm mb-1">Швидка підтримка та спільнота:</p>
              <a
                href="https://t.me/bezsonnya_net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-400 text-sm font-medium"
              >
                @bezsonnya_net
              </a>
            </div>

            <div>
              <h2 className="font-semibold text-white mb-2">Реквізити</h2>
              <div className="text-slate-300 text-sm space-y-1">
                <p>ФОП [Прізвище Ім'я По-батькові]</p>
                <p>ЄДРПОУ: [код]</p>
                <p>Україна</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-sm text-slate-400">
              Відповідаємо протягом 24 годин у робочі дні.
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
