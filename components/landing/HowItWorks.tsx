const steps = [
  {
    number: '01',
    title: 'Пройдіть тест',
    description: '10 запитань про ваш сон. Займає 3 хвилини. Без реєстрації.'
  },
  {
    number: '02',
    title: 'Отримайте результат',
    description: 'Ваш тип безсоння + безкоштовний розбір: що відбувається і чому.'
  },
  {
    number: '03',
    title: 'Отримайте повний аналіз',
    description: 'За 29 грн — повний розбір вашого типу та покроковий план на 7 днів.'
  },
  {
    number: '04',
    title: 'Починайте відновлення',
    description: 'Практикуйте конкретні техніки. Додаткова підтримка — аудіо-сесії та курс.'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Як це працює</h2>
          <p className="text-slate-500 text-lg">Від тесту до нормального сну — за кілька кроків</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-xl p-6 border border-slate-200 relative">
              <div className="text-4xl font-bold text-indigo-100 mb-4 font-mono">{step.number}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
