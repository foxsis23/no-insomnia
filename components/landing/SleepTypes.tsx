const types = [
  {
    emoji: '😤',
    title: 'Напружений тип',
    description: 'Мозок не «вимикається» ввечері. Думки, плани, тривоги — нервова система в режимі готовності.'
  },
  {
    emoji: '🌙',
    title: 'Нічні пробудження',
    description: 'Засинаєте нормально, але ніч переривається. Мозок «перевіряє обстановку» занадто часто.'
  },
  {
    emoji: '🌅',
    title: 'Раннє прокидання',
    description: 'Прокидаєтесь на 1–2 години раніше. Кортизол запускається зарано — сон обривається.'
  },
  {
    emoji: '🔀',
    title: 'Переривчастий сон',
    description: 'Спите, але без глибоких фаз. 8 годин у ліжку — і прокидаєтесь розбитим.'
  },
  {
    emoji: '😰',
    title: 'Передсонна тривога',
    description: 'Ліжко стало тригером тривоги. Хвилюєтесь про сон ще вдень — це умовний рефлекс.'
  }
]

export default function SleepTypes() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">5 типів безсоння</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Тест визначить ваш тип — кожен потребує різного підходу
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map((type) => (
            <div key={type.title} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
              <div className="text-3xl mb-3">{type.emoji}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{type.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{type.description}</p>
            </div>
          ))}
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center">
            <p className="text-slate-600 text-sm mb-3">Який тип у вас?</p>
            <a
              href="/test"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Пройти тест →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
