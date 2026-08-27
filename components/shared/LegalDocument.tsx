import { LegalBlock } from '@/types/legal'

interface Props {
  blocks: LegalBlock[]
}

export default function LegalDocument({ blocks }: Props) {
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8 text-sm leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} className="text-lg font-semibold text-white mt-8 first:mt-0 mb-3">
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="text-base font-medium text-indigo-300 mt-6 mb-2">
                {block.text}
              </h3>
            )
          case 'li':
            return (
              <p key={i} className="text-slate-300 pl-5 mb-2 relative before:content-['—'] before:absolute before:left-0 before:text-indigo-400">
                {block.text}
              </p>
            )
          default:
            return (
              <p key={i} className="text-slate-300 mb-3">
                {block.text}
              </p>
            )
        }
      })}
    </div>
  )
}
