import type { Metadata } from 'next'
import Header from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'Політика конфіденційності — безсоння.net',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Політика конфіденційності</h1>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 prose prose-slate max-w-none text-sm leading-relaxed">
            <h2 className="text-base font-semibold text-slate-900 mt-0">1. Загальні положення</h2>
            <p className="text-slate-600">
              Ця Політика конфіденційності описує, як безсоння.net збирає, використовує та захищає
              персональні дані користувачів сайту.
            </p>
            <h2 className="text-base font-semibold text-slate-900 mt-6">2. Які дані ми збираємо</h2>
            <ul className="text-slate-600 space-y-1">
              <li>Email-адреса (якщо вказана добровільно при оплаті)</li>
              <li>Результати тесту (анонімно, без прив'язки до особи)</li>
              <li>Дані про оплату (обробляються WayForPay, ми не зберігаємо платіжні дані)</li>
              <li>Аналітичні дані (Google Analytics, анонімно)</li>
            </ul>
            <h2 className="text-base font-semibold text-slate-900 mt-6">3. Як ми використовуємо дані</h2>
            <ul className="text-slate-600 space-y-1">
              <li>Для надання оплачених матеріалів</li>
              <li>Для покращення сервісу</li>
              <li>Ми не передаємо дані третім особам крім платіжної системи</li>
            </ul>
            <h2 className="text-base font-semibold text-slate-900 mt-6">4. Захист даних</h2>
            <p className="text-slate-600">
              Ми використовуємо шифрування HTTPS та безпечні сховища даних. Платіжні дані обробляє
              WayForPay згідно зі стандартом PCI DSS.
            </p>
            <h2 className="text-base font-semibold text-slate-900 mt-6">5. Ваші права</h2>
            <p className="text-slate-600">
              Ви можете запросити видалення ваших даних, написавши на email: support@bezsonnya.net
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
