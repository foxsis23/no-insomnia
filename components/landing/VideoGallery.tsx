'use client'

import { useState } from 'react'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export interface PreviewVideo {
  title: string
  url: string | null
}

interface Props {
  videos: PreviewVideo[]
}

export default function VideoGallery({ videos }: Props) {
  const [active, setActive] = useState(0)
  // Плеєр вантажиться лише після кліку
  const [playing, setPlaying] = useState<number | null>(null)

  const n = videos.length
  if (!n) return null

  // Позиція картки відносно активної з урахуванням кільця:
  // ліворуч від першої стоїть остання, тому порожнечі не буває.
  const relative = (i: number) => {
    let d = i - active
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  const go = (next: number) => {
    setActive((next + n) % n)
    setPlaying(null) // перегорнули — зупиняємо попереднє відео
  }

  return (
    <section id="videos" className="py-20 bg-slate-950 border-t border-white/5 overflow-hidden">
      <div className="px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Відео про сон</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Короткі розбори від лікаря — дивіться прямо тут
        </p>
      </div>

      <div className="relative">
        <div className="vg vg-mask relative w-full">
          {videos.map((video, i) => {
            const r = relative(i)
            const isActive = r === 0
            const isNeighbour = Math.abs(r) === 1
            return (
              <div
                key={video.title}
                className={`vg-item absolute left-1/2 top-0 transition-all duration-500 ease-out ${
                  isActive ? 'z-20' : 'z-10'
                } ${isNeighbour ? 'opacity-40 blur-[3px]' : isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ '--r': r, '--s': isActive ? 1 : 0.7 } as React.CSSProperties}
                aria-hidden={!isActive && !isNeighbour}
              >
                <div
                  className={`relative aspect-video rounded-2xl overflow-hidden border bg-slate-900 ${
                    isActive ? 'border-indigo-500/40 shadow-2xl shadow-black/60' : 'border-white/10'
                  }`}
                >
                  {playing === i && video.url ? (
                    <iframe
                      src={`${video.url}&autoplay=true`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (!isActive) {
                          go(i)
                          return
                        }
                        if (video.url) {
                          setPlaying(i)
                          trackEvent('play_video', { title: video.title })
                        }
                      }}
                      aria-label={isActive ? `Дивитись: ${video.title}` : `Перейти до: ${video.title}`}
                      className="group absolute inset-0 w-full h-full cursor-pointer bg-gradient-to-br from-slate-900 to-slate-950"
                    >
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
                        {isActive && (
                          <span className="w-16 h-16 rounded-full bg-indigo-500/90 group-hover:bg-indigo-400 flex items-center justify-center transition-colors shadow-lg shadow-black/40">
                            <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                          </span>
                        )}
                        <span className="text-slate-300 text-sm font-medium leading-snug">
                          {video.title}
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Попереднє відео"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Наступне відео"
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4">
        <p className="text-center text-white font-medium text-lg mt-10 mb-5">{videos[active].title}</p>
        <div className="flex justify-center gap-2">
          {videos.map((video, i) => (
            <button
              key={video.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Відео ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === active ? 'w-8 bg-indigo-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
