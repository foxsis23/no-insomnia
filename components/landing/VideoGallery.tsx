'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

// id беруться з посилання youtu.be/<id>
const VIDEOS: { id: string; title: string }[] = [
  { id: '1NZUlarV7sQ', title: 'Що насправді відбувається, коли ви не спите' },
  { id: 'nxx_ZomYzDw', title: 'Типи безсоння (щоб перестати панікувати)' },
  { id: 'YHGj4-UCkYQ', title: 'Чому таблетки здаються рішенням' },
  { id: 'nW0_6OsvbsA', title: 'Головний механізм безсоння — гіперактивація' },
  { id: 'mg76dqj99tc', title: 'Найбільші помилки, які погіршують сон' },
  { id: 'w59glBMR1RM', title: 'Що робити саме вночі (практика)' },
  { id: 'Dsj_bJWUDww', title: 'Режим і біологічний годинник' },
  { id: 'tQuprVMvHtU', title: 'Кофеїн, гаджети, їжа — правда без міфів' },
  { id: 'Nhe8TpABnGI', title: 'Безсоння: розбір лікаря' },
  { id: '1WTduMFrZT8', title: 'Коли потрібен лікар' },
]

const N = VIDEOS.length

// Позиція картки відносно активної з урахуванням кільця:
// для активної 0, для сусідів ±1. Завдяки цьому ліворуч від першої
// картки стоїть остання — порожнечі не буває.
function relative(index: number, active: number) {
  let d = index - active
  if (d > N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

export default function VideoGallery() {
  const [active, setActive] = useState(0)
  // Плеєр вантажиться лише після кліку — 10 iframe одразу вбили б завантаження
  const [playing, setPlaying] = useState<string | null>(null)

  const go = (next: number) => {
    setActive((next + N) % N)
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
          {VIDEOS.map((video, i) => {
            const r = relative(i, active)
            const isActive = r === 0
            const isNeighbour = Math.abs(r) === 1
            return (
              <div
                key={video.id}
                className={`vg-item absolute left-1/2 top-0 transition-all duration-500 ease-out ${
                  isActive ? 'z-20' : 'z-10'
                } ${isNeighbour ? 'opacity-35 blur-[3px]' : isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ '--r': r, '--s': isActive ? 1 : 0.7 } as React.CSSProperties}
                aria-hidden={!isActive && !isNeighbour}
              >
                <div
                  className={`relative aspect-video rounded-2xl overflow-hidden border bg-black ${
                    isActive ? 'border-indigo-500/40 shadow-2xl shadow-black/60' : 'border-white/10'
                  }`}
                >
                  {playing === video.id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (!isActive) {
                          go(i) // клік по сусідній — гортаємо до неї
                          return
                        }
                        setPlaying(video.id)
                        trackEvent('play_video', { video_id: video.id })
                      }}
                      aria-label={isActive ? `Дивитись: ${video.title}` : `Перейти до: ${video.title}`}
                      className="group absolute inset-0 w-full h-full cursor-pointer"
                    >
                      <Image
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 66vw, 820px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute inset-0 transition-colors ${
                          isActive ? 'bg-slate-950/20 group-hover:bg-slate-950/5' : 'bg-slate-950/60'
                        }`}
                      />
                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-16 h-16 rounded-full bg-indigo-500/90 group-hover:bg-indigo-400 flex items-center justify-center transition-colors shadow-lg shadow-black/40">
                            <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                          </span>
                        </span>
                      )}
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
        <p className="text-center text-white font-medium text-lg mt-10 mb-5">{VIDEOS[active].title}</p>
        <div className="flex justify-center gap-2">
          {VIDEOS.map((video, i) => (
            <button
              key={video.id}
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
