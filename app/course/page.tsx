import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import CoursePurchase from './CoursePurchase'
import { getProduct } from '@/lib/products'

export const dynamic = 'force-dynamic'

const modules = [
  { title: 'Як працює сон', description: 'Архітектура сну, цикли, фази. Чому ви прокидаєтесь розбитим.' },
  { title: 'Ваш хронотип', description: 'Жайворонок чи сова — і як це впливає на режим.' },
  { title: '5 типів безсоння', description: 'Детальний розбір кожного типу з механізмами.' },
  { title: 'КПТ-I основи', description: 'Когнітивно-поведінкова терапія безсоння — золотий стандарт лікування.' },
  { title: 'Протоколи відновлення', description: 'Покроковий план для вашого типу з щоденними практиками.' },
  { title: 'Стрес і сон', description: 'Як кортизол руйнує сон і як це зупинити.' },
  { title: 'Харчування та сон', description: 'Що їсти і чого уникати для покращення якості сну.' },
  { title: 'Довгострокова підтримка', description: 'Як підтримувати нормальний сон після відновлення.' }
]

export default async function CoursePage() {
  const course = await getProduct('course')

  if (!course) notFound()

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-slate-50 py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
              🎓 Відеокурс
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Сон без таблеток</h1>
            <p className="text-xl text-slate-600 mb-4">
              Повний курс від лікаря-сомнолога. 8 модулів, 40+ відеоуроків.
            </p>
            <div className="text-4xl font-bold text-slate-900">{course.price} грн</div>
            <p className="text-slate-500 text-sm mt-1">Довічний доступ</p>
          </div>
        </section>

        {/* Modules */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Програма курсу</h2>
            <div className="space-y-3">
              {modules.map((mod, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{mod.title}</div>
                    <div className="text-slate-500 text-sm mt-0.5">{mod.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Purchase */}
        <section className="py-10 px-4 pb-20">
          <CoursePurchase price={course.price} />
        </section>
      </main>
    </>
  )
}
