'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

// Назви можна замінити на реальні — id брати з посилання youtu.be/<id>
const VIDEOS: { id: string; title: string }[] = [
  { id: '1NZUlarV7sQ', title: 'Відео 1' },
  { id: 'nxx_ZomYzDw', title: 'Відео 2' },
  { id: 'YHGj4-UCkYQ', title: 'Відео 3' },
  { id: 'nW0_6OsvbsA', title: 'Відео 4' },
  { id: 'mg76dqj99tc', title: 'Відео 5' },
  { id: 'w59glBMR1RM', title: 'Відео 6' },
  { id: 'Dsj_bJWUDww', title: 'Відео 7' },
  { id: 'tQuprVMvHtU', title: 'Відео 8' },
  { id: 'Nhe8TpABnGI', title: 'Відео 9' },
  { id: '1WTduMFrZT8', title: 'Відео 10' },
]

export default function VideoGallery() {
  // Плеєр вантажиться лише після кліку — 10 iframe одразу вбили б завантаження сторінки
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <section id="videos" className="py-20 px-4 bg-slate-950 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Відео про сон</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Короткі розбори від лікаря — дивіться прямо тут
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black"
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
                    setPlaying(video.id)
                    trackEvent('play_video', { video_id: video.id })
                  }}
                  aria-label={`Дивитись: ${video.title}`}
                  className="group absolute inset-0 w-full h-full cursor-pointer"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-indigo-500/90 group-hover:bg-indigo-400 flex items-center justify-center transition-colors shadow-lg shadow-black/40">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                    </span>
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
