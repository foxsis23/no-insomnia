import type { Metadata } from 'next'
import Header from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'Публічна оферта — безсоння.net',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Публічна оферта</h1>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-sm leading-relaxed space-y-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-2">1. Предмет договору</h2>
              <p className="text-slate-600">
                ФОП [Назва] (надалі «Продавець») пропонує фізичним особам (надалі «Покупець») придбати
                цифрові інформаційні продукти на сайті безсоння.net.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-2">2. Акцепт оферти</h2>
              <p className="text-slate-600">
                Здійснення оплати є повним і беззастережним акцептом цієї оферти. Договір вважається
                укладеним з моменту отримання Продавцем підтвердження оплати.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-2">3. Умови надання послуг</h2>
              <p className="text-slate-600">
                Цифровий контент надається миттєво після успішної оплати через захищене посилання.
                Контент має виключно інформаційний та освітній характер.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-2">4. Повернення коштів</h2>
              <p className="text-slate-600">
                Оскільки продукт є цифровим та надається миттєво, повернення коштів можливе лише
                у виняткових випадках за рішенням Продавця. Для запиту — support@bezsonnya.net.
              </p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-2">5. Обмеження відповідальності</h2>
              <p className="text-slate-600">
                Матеріали мають освітній характер і не є медичною консультацією. Продавець не несе
                відповідальності за результати застосування матеріалів.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
