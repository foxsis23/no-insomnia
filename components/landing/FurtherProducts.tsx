import Link from 'next/link'

const products = [
  {
    id: 'sleep_return_protocol',
    icon: '📋',
    title: 'Протокол повернення сну',
    description: '14-денний план нормалізації сну без медикаментів. На основі КПТ-I.',
    price: 49,
    tag: 'Протокол'
  },
  {
    id: 'sleep_7_nights_recovery',
    icon: '🌟',
    title: '7 ночей відновлення',
    description: 'Повна програма: щовечірній ритуал, техніки, ранковий протокол.',
    price: 149,
    tag: 'Програма'
  },
  {
    id: 'course',
    icon: '🎓',
    title: 'Курс лікаря: сон без таблеток',
    description: '8 модулів, 40+ відеоуроків від лікаря-сомнолога.',
    price: 590,
    tag: 'Курс'
  }
]

export default function FurtherProducts() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Глибше відновлення</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Для тих, хто хоче більше, ніж просто розуміння — системне відновлення сну
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{product.icon}</span>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{product.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-lg">{product.price} грн</span>
                <Link
                  href={product.id === 'course' ? '/course' : `/offer?product=${product.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Детальніше
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
