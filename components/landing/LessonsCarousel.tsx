'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Play, Lock, ChevronLeft, ChevronRight } from 'lucide-react'
import { LESSON_PREVIEWS, COURSE_PRODUCT_ID } from '@/data/courseVideos'
import { useSessionStore, isSessionValid } from '@/lib/sessionStore'
import { trackEvent } from '@/lib/analytics'

const N = LESSON_PREVIEWS.length

// Позиція картки відносно активної з урахуванням кільця:
// ліворуч від першої стоїть остання, тому порожнечі не буває.
function relative(index: number, active: number) {
  let d = index - active
  if (d > N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

export default function LessonsCarousel() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const [playingUrl, setPlayingUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const sessionToken = useSessionStore((s) => s.sessionToken)
  const sessionExpiresAt = useSessionStore((s) => s.sessionExpiresAt)
  const purchased = useSessionStore((s) => s.purchasedProductIds)

  const hasCourse =
    isSessionValid(sessionToken, sessionExpiresAt) && purchased.includes(COURSE_PRODUCT_ID)

  const go = (next: number) => {
    setActive((next + N) % N)
    setPlayingUrl(null) // перегорнули — зупиняємо попереднє відео
  }

  const handlePlay = async (index: number) => {
    if (!hasCourse) {
      trackEvent('click_locked_lesson', { lesson: index + 1 })
      router.push('/course')
      return
    }
    // Посилання підписує сервер і лише після перевірки оплати
    setLoading(true)
    try {
      const res = await fetch(`/api/course-videos?token=${encodeURIComponent(sessionToken!)}`, {
        cache: 'no-store',
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      const url = json.videos?.[index]?.url
      if (url) {
        setPlayingUrl(url)
        trackEvent('play_lesson', { lesson: index + 1 })
      }
    } catch {
      router.push('/course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="videos" className="py-20 bg-slate-950 border-t border-white/5 overflow-hidden">
      <div className="px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Курс лікаря: 10 уроків</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          {hasCourse
            ? 'Ваш курс — дивіться прямо тут'
            : 'Перегляд уроків відкривається після оплати курсу'}
        </p>
      </div>

      <div className="relative">
        <div className="vg vg-mask relative w-full">
          {LESSON_PREVIEWS.map((lesson, i) => {
            const r = relative(i, active)
            const isActive = r === 0
            const isNeighbour = Math.abs(r) === 1
            return (
              <div
                key={lesson.title}
                className={`vg-item absolute left-1/2 top-0 transition-all duration-500 ease-out ${
                  isActive ? 'z-20' : 'z-10'
                } ${isNeighbour ? 'opacity-40 blur-[3px]' : isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ '--r': r, '--s': isActive ? 1 : 0.7 } as React.CSSProperties}
                aria-hidden={!isActive && !isNeighbour}
              >
                <div
                  className={`relative aspect-video rounded-2xl overflow-hidden border bg-black ${
                    isActive ? 'border-indigo-500/40 shadow-2xl shadow-black/60' : 'border-white/10'
                  }`}
                >
                  {isActive && playingUrl ? (
                    <iframe
                      src={`${playingUrl}&autoplay=true`}
                      title={lesson.title}
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => (isActive ? handlePlay(i) : go(i))}
                      aria-label={
                        isActive
                          ? hasCourse
                            ? `Дивитись: ${lesson.title}`
                            : `Купити курс, щоб подивитись: ${lesson.title}`
                          : `Перейти до: ${lesson.title}`
                      }
                      className="group absolute inset-0 w-full h-full cursor-pointer"
                    >
                      <Image
                        src={lesson.poster}
                        alt={lesson.title}
                        fill
                        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 66vw, 820px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute inset-0 transition-colors ${
                          isActive ? 'bg-slate-950/25 group-hover:bg-slate-950/10' : 'bg-slate-950/60'
                        }`}
                      />
                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-16 h-16 rounded-full bg-indigo-500/90 group-hover:bg-indigo-400 flex items-center justify-center transition-colors shadow-lg shadow-black/40">
                            {loading ? (
                              <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : hasCourse ? (
                              <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                            ) : (
                              <Lock className="w-6 h-6 text-white" />
                            )}
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
          aria-label="Попередній урок"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Наступний урок"
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4">
        <p className="text-center text-white font-medium text-lg mt-10 mb-2">
          <span className="text-slate-500 text-sm block mb-1">Урок {active + 1} з {N}</span>
          {LESSON_PREVIEWS[active].title}
        </p>

        {!hasCourse && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => router.push('/course')}
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer"
            >
              Відкрити всі 10 уроків →
            </button>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-8">
          {LESSON_PREVIEWS.map((lesson, i) => (
            <button
              key={lesson.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`Урок ${i + 1}`}
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
