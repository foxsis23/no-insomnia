'use client'

import { useEffect, useState } from 'react'
import { Play, Lock } from 'lucide-react'

interface Lesson {
  title: string
  url: string | null
}

interface Props {
  token: string
}

export default function CourseVideos({ token }: Props) {
  const [lessons, setLessons] = useState<Lesson[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  // Плеєр вантажиться лише після кліку
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/course-videos?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Не вдалося завантажити уроки')
        return json.videos as Lesson[]
      })
      .then((videos) => {
        if (!cancelled) setLessons(videos)
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message)
      })
    return () => {
      cancelled = true
    }
  }, [token])

  if (error) {
    return (
      <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
        <Lock className="w-5 h-5 text-amber-200 shrink-0 mt-0.5" />
        <p className="text-amber-200 text-sm">{error}</p>
      </div>
    )
  }

  if (!lessons) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!lessons.length) {
    return <p className="text-slate-400 text-sm">Уроки скоро з’являться.</p>
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson, i) => (
        <div key={lesson.title} className="rounded-xl overflow-hidden border border-white/10">
          {openIndex === i && lesson.url ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={lesson.url}
                title={lesson.title}
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="w-10 h-10 rounded-full bg-indigo-500/90 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
              </span>
              <span>
                <span className="block text-xs text-slate-500 mb-0.5">Урок {i + 1}</span>
                <span className="block text-white font-medium">{lesson.title}</span>
              </span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
