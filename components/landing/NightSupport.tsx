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
    <section className="py-20 px-4 bg-slate-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Нічна підтримка</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Аудіо-сесії для роботи з різними типами безсоння — слухайте прямо в момент потреби
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-5">
          {products.map((product) => {
            const Icon = ICONS[product.id] || Headphones
            return (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl p-6 w-full sm:w-72 bg-white/5 ring-1 ring-white/10 hover:ring-indigo-500/40 transition-colors"
              >
                <Icon className="w-9 h-9 text-indigo-400" strokeWidth={1.75} />
                <h3 className="mt-4 font-bold text-white text-lg">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-400 leading-snug flex-1">{product.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{product.price} грн</span>
                  <Link
                    href={`/offer?product=${product.id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
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
