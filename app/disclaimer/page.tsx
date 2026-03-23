import type { Metadata } from 'next'
import Header from '@/components/shared/Header'

export const metadata: Metadata = {
  title: 'Медичне застереження — безсоння.net',
}

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Медичне застереження</h1>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-sm leading-relaxed space-y-4 text-amber-900">
            <p className="font-semibold text-base">Важлива інформація</p>
            <p>
              Усі матеріали на сайті безсоння.net мають виключно інформаційний та освітній характер.
              Вони <strong>не є медичною консультацією</strong> і не замінюють діагностику або лікування лікарем.
            </p>
            <p>
              Тест на визначення типу безсоння є освітнім інструментом і не може використовуватись
              для медичної діагностики.
            </p>
            <p className="font-medium">Зверніться до лікаря, якщо:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Проблеми зі сном тривають понад 3 місяці</li>
              <li>Ви приймаєте медикаменти, що впливають на сон</li>
              <li>У вас є підозра на апное (зупинки дихання уві сні)</li>
              <li>Безсоння супроводжується симптомами депресії або тривожного розладу</li>
              <li>Ви вагітні або маєте хронічні захворювання</li>
            </ul>
            <p>
              Техніки, описані в матеріалах, засновані на доказових методах (зокрема КПТ-I),
              але їх ефективність може варіюватись індивідуально.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
