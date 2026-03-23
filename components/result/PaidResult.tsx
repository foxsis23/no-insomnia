import { ResultData } from '@/types'
import Link from 'next/link'
import { PRODUCTS } from '@/data/products'

interface PaidResultProps {
  result: ResultData
}

export default function PaidResult({ result }: PaidResultProps) {
  const upsellProducts = result.upsellProducts
    .map((id) => PRODUCTS[id])
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Full content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Повний розбір вашого типу</h2>
        <div className="prose prose-slate prose-sm max-w-none">
          {result.fullText.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return <h3 key={i} className="text-base font-bold text-slate-900 mt-6 mb-2">{block.replace('## ', '')}</h3>
            }
            if (block.startsWith('**') || block.includes('**')) {
              const parts = block.split('**')
              return (
                <p key={i} className="text-slate-600 text-sm leading-relaxed mb-3">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-slate-800">{part}</strong> : part
                  )}
                </p>
              )
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').filter(l => l.startsWith('- '))
              return (
                <ul key={i} className="space-y-1 mb-3">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-indigo-400 flex-shrink-0 mt-0.5">•</span>
                      {item.replace('- ', '')}
                    </li>
                  ))}
                </ul>
              )
            }
            return <p key={i} className="text-slate-600 text-sm leading-relaxed mb-3">{block}</p>
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Рекомендації для вашого типу</h3>
        <ul className="space-y-2">
          {result.recommendations.map((rec, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
              <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                {i + 1}
              </span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Upsell */}
      {upsellProducts.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Наступний крок для вашого типу</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {upsellProducts.map((product) => (
              <div key={product.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
                <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full w-fit mb-3">
                  {product.tag}
                </div>
                <h4 className="font-medium text-slate-900 text-sm mb-1">{product.name}</h4>
                <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{product.price} грн</span>
                  <Link
                    href={product.id === 'course' ? '/course' : `/offer?product=${product.id}`}
                    className="text-indigo-500 hover:text-indigo-600 text-xs font-medium"
                  >
                    Придбати →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
