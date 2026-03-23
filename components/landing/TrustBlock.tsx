const stats = [
  { value: '94%', label: 'точність визначення типу безсоння' },
  { value: '7 000+', label: 'людей вже пройшли тест' },
  { value: '3 хв', label: 'часу займає тест' },
  { value: '29 грн', label: 'повний розбір та план дій' }
]

const reviews = [
  {
    name: 'Ірина К.',
    city: 'Київ',
    text: 'Нарешті зрозуміла, чому не можу заснути. Виявилось — передсонна тривога. Техніка парадоксального наміру реально спрацювала за 3 дні.'
  },
  {
    name: 'Олексій М.',
    city: 'Харків',
    text: 'Думав, що в мене просто «легкий сон». Виявилось — переривчастий тип. Протокол консолідації — спочатку страшно, але після 5 ночей якість сну покращилась помітно.'
  },
  {
    name: 'Наталія Р.',
    city: 'Львів',
    text: 'Прокидалась о 4 ранку вже рік. Тест показав «раннє прокидання». Затемнила кімнату і стабілізувала час підйому — пробуджень стало значно менше.'
  }
]

export default function TrustBlock() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-3xl font-bold text-indigo-500 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Що кажуть люди</h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.name} className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex text-indigo-400 mb-4">{'★★★★★'}</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <div className="text-sm font-medium text-slate-900">
                {review.name} <span className="text-slate-400 font-normal">• {review.city}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
