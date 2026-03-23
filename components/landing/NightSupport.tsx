import Link from 'next/link'

const audios = [
  {
    id: 'night_support_fall_asleep',
    icon: '🌙',
    title: 'Засинання',
    description: '20-хвилинна сесія, що переводить нервову систему в режим сну.',
    price: 49
  },
  {
    id: 'night_support_woke_up',
    icon: '⏰',
    title: 'Прокинувся вночі',
    description: 'Повернення до сну після нічного пробудження. Не дає запустити тривогу.',
    price: 49
  },
  {
    id: 'night_support_before_sleep',
    icon: '😮‍💨',
    title: 'Передсонна тривога',
    description: 'Розрядка тривоги за 30 хвилин до сну. З режиму «загроза» — в режим «безпека».',
    price: 49
  }
]

export default function NightSupport() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Нічна підтримка</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Аудіо-сесії для роботи з різними типами безсоння — слухайте прямо в момент потреби
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {audios.map((audio) => (
            <div key={audio.id} className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col">
              <div className="text-3xl mb-4">{audio.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{audio.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{audio.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{audio.price} грн</span>
                <Link
                  href={`/offer?product=${audio.id}`}
                  className="text-indigo-500 hover:text-indigo-600 text-sm font-medium transition-colors"
                >
                  Придбати →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
