'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function VideoGallery() {
  const [active, setActive] = useState(0)
  // Плеєр вантажиться лише після кліку — 10 iframe одразу вбили б завантаження
  const [playing, setPlaying] = useState<string | null>(null)

  // Зсув рахуємо в пікселях за реальними розмірами: відсотки в translateX
  // рахуються від ширини треку, а не контейнера, і центр «їде».
  const viewportRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current
      const slide = slideRef.current
      if (!viewport || !slide) return
      const slideW = slide.offsetWidth
      setOffset(viewport.offsetWidth / 2 - slideW / 2 - active * slideW)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [active])

  const go = (next: number) => {
    setActive((next + VIDEOS.length) % VIDEOS.length)
    setPlaying(null) // перелистнули — зупиняємо попереднє відео
  }

  return (
    <section id="videos" className="py-20 bg-slate-950 border-t border-white/5 overflow-hidden">
      <div className="px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Відео про сон</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Короткі розбори від лікаря — дивіться прямо тут
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div ref={viewportRef} className="vg-viewport overflow-hidden">
        <div
          className="vg-track flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {VIDEOS.map((video, i) => {
            const isActive = i === active
            return (
              <div
                key={video.id}
                ref={i === 0 ? slideRef : undefined}
                className="vg-slide flex-none px-2 sm:px-3"
              >
                {/* центральний слайд на ~30% більший за сусідів */}
                <div
                  className={`relative aspect-video rounded-2xl overflow-hidden border bg-black transition-all duration-500 ease-out ${
                    isActive
                      ? 'border-indigo-500/40 scale-100 opacity-100'
                      : 'border-white/10 scale-[0.8] opacity-35 blur-[3px]'
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
                          go(i) // клік по сусідньому — гортаємо до нього
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
                        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 60vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute inset-0 transition-colors ${
                          isActive ? 'bg-slate-950/25 group-hover:bg-slate-950/10' : 'bg-slate-950/70'
                        }`}
                      />
                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-14 h-14 rounded-full bg-indigo-500/90 group-hover:bg-indigo-400 flex items-center justify-center transition-colors shadow-lg shadow-black/40">
                            <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
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
        </div>

        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Попереднє відео"
          className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Наступне відео"
          className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4">
        <p className="text-center text-white font-medium mt-8 mb-5">{VIDEOS[active].title}</p>
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
