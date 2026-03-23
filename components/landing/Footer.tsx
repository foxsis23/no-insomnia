import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-semibold text-slate-900 text-lg mb-3">
              безсоння<span className="text-indigo-500">.net</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Науково обґрунтовані підходи до відновлення сну. Не медицина — освіта.
            </p>
          </div>

          <div>
            <div className="font-medium text-slate-900 mb-3">Продукти</div>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/test" className="hover:text-slate-900 transition-colors">Безкоштовний тест</Link></li>
              <li><Link href="/offer?product=sleep_reason" className="hover:text-slate-900 transition-colors">Розбір типу (29 грн)</Link></li>
              <li><Link href="/offer?product=sleep_7_nights_recovery" className="hover:text-slate-900 transition-colors">7 ночей відновлення</Link></li>
              <li><Link href="/course" className="hover:text-slate-900 transition-colors">Курс лікаря (590 грн)</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-slate-900 mb-3">Інформація</div>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Політика конфіденційності</Link></li>
              <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Публічна оферта</Link></li>
              <li><Link href="/disclaimer" className="hover:text-slate-900 transition-colors">Медичне застереження</Link></li>
              <li><Link href="/contacts" className="hover:text-slate-900 transition-colors">Контакти</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© 2024 безсоння.net. Всі права захищені.</p>
          <p>ФОП Приклад В.В. | Тест має виключно освітній характер</p>
        </div>
      </div>
    </footer>
  )
}
