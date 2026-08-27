import Image from 'next/image'

const types: { image: string; title: string; description: string }[] = [
  {
    image: '/images/sleep-tense.webp',
    title: 'Напружений тип',
    description: 'Мозок не «вимикається» ввечері. Думки, плани, тривоги — нервова система в режимі готовності.'
  },
  {
    image: '/images/sleep-waking.webp',
    title: 'Нічні пробудження',
    description: 'Засинаєте нормально, але ніч переривається. Мозок «перевіряє обстановку» занадто часто.'
  },
  {
    image: '/images/sleep-early.webp',
    title: 'Раннє прокидання',
    description: 'Прокидаєтесь на 1–2 години раніше. Кортизол запускається зарано — сон обривається.'
  },
  {
    image: '/images/sleep-fragmented.webp',
    title: 'Переривчастий сон',
    description: 'Спите, але без глибоких фаз. 8 годин у ліжку — і прокидаєтесь розбитим.'
  },
  {
    image: '/images/sleep-anxiety.webp',
    title: 'Передсонна тривога',
    description: 'Ліжко стало тригером тривоги. Хвилюєтесь про сон ще вдень — це умовний рефлекс.'
  }
]

export default function SleepTypes() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">5 типів безсоння</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Тест визначить ваш тип — кожен потребує різного підходу
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map(({ image, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/40 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}

          <div className="p-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 flex flex-col items-center justify-center text-center">
            <p className="text-slate-300 text-sm mb-3">Який тип у вас?</p>
            <a
              href="/test"
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Пройти тест →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
