import Link from 'next/link'
import { Moon, AlarmClock, Wind, Headphones, type LucideIcon } from 'lucide-react'
import { Product } from '@/types'

const ICONS: Record<string, LucideIcon> = {
  night_support_fall_asleep: Moon,
  night_support_woke_up: AlarmClock,
  night_support_before_sleep: Wind,
}

interface Props {
  products: Product[]
}

export default function NightSupport({ products }: Props) {
  if (!products.length) return null

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
          {products.map((product) => {
            const Icon = ICONS[product.id] || Headphones
            return (
              <div key={product.id} className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col">
                <Icon className="w-8 h-8 text-indigo-500 mb-4" strokeWidth={1.5} />
                <h3 className="font-semibold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{product.price} грн</span>
                  <Link
                    href={`/offer?product=${product.id}`}
                    className="text-indigo-500 hover:text-indigo-600 text-sm font-medium transition-colors"
                  >
                    Придбати →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
