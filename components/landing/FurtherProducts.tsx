import Link from 'next/link'
import { ClipboardList, Waypoints, GraduationCap, Package, Check, type LucideIcon } from 'lucide-react'
import { Product } from '@/types'

// Presentation layer: titles and prices come from the API, this only adds
// the icon, the short pitch and the feature list per product.
const META: Record<string, { Icon: LucideIcon; subtitle: string; features: string[]; cta: string }> = {
  sleep_return_protocol: {
    Icon: ClipboardList,
    subtitle: 'Структурований план нормалізації сну без медикаментів.',
    features: ['14-денний покроковий план', 'Засновано на методах КПТ-I', 'Без снодійних'],
    cta: 'Отримати протокол',
  },
  sleep_7_nights_recovery: {
    Icon: Waypoints,
    subtitle: 'Повна програма перезапуску сну — сім ночей поспіль.',
    features: ['Щовечірній ритуал', 'Техніки для вашого типу', 'Ранковий протокол'],
    cta: 'Почати програму',
  },
  course: {
    Icon: GraduationCap,
    subtitle: 'Повний відеокурс від лікаря-сомнолога.',
    features: ['8 модулів, 40+ відеоуроків', 'Практичні техніки', 'Особистий зворотній зв\'язок'],
    cta: 'Перейти до курсу',
  },
}

const FALLBACK = {
  Icon: Package,
  subtitle: '',
  features: [] as string[],
  cta: 'Детальніше',
}

const HIGHLIGHTED_ID = 'sleep_7_nights_recovery'

interface Props {
  products: Product[]
  showCourse: boolean
}

export default function FurtherProducts({ products }: Props) {
  if (!products.length) return null

  // Goldilocks: the middle tier carries the badge. Fall back to the second
  // card if that product is switched off in the admin panel.
  const highlightIndex = products.findIndex((p) => p.id === HIGHLIGHTED_ID)
  const highlighted = highlightIndex >= 0 ? highlightIndex : Math.min(1, products.length - 1)

  return (
    <section className="py-20 px-4 bg-slate-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-4">Глибше відновлення</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Для тих, хто хоче більше, ніж просто розуміння — системне відновлення сну
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-5">
          {products.map((product, i) => {
            const meta = META[product.id] || FALLBACK
            const { Icon } = meta
            const isHighlighted = i === highlighted

            return (
              <div
                key={product.id}
                className={`relative flex flex-col rounded-2xl p-6 w-full sm:w-72 bg-white/5 transition-transform hover:scale-[1.02] ${
                  isHighlighted
                    ? 'ring-2 ring-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.15)]'
                    : 'ring-1 ring-white/10'
                }`}
              >
                {isHighlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    Найпопулярніше
                  </span>
                )}

                <Icon className="w-9 h-9 text-indigo-400" strokeWidth={1.75} />

                <h3 className="mt-4 font-bold text-white text-lg">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-400 leading-snug">
                  {meta.subtitle || product.description}
                </p>

                {meta.features.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {meta.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-6">
                  <div className="text-3xl font-bold text-white mb-4">{product.price} грн</div>
                  <Link
                    href={product.id === 'course' ? '/course' : `/offer?product=${product.id}`}
                    className={`block text-center font-semibold px-5 py-3 rounded-xl transition-colors ${
                      isHighlighted
                        ? 'bg-indigo-500 hover:bg-indigo-400 text-white'
                        : 'border border-white/15 hover:border-white/30 text-white'
                    }`}
                  >
                    {meta.cta}
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
