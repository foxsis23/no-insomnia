import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import FloatingBot from '@/components/shared/FloatingBot'
import Hero from '@/components/landing/Hero'
import WhatTestGives from '@/components/landing/WhatTestGives'
import HowItWorks from '@/components/landing/HowItWorks'
import SleepTypes from '@/components/landing/SleepTypes'
import VideoGallery from '@/components/landing/VideoGallery'
import TrustBlock from '@/components/landing/TrustBlock'
import ResultExample from '@/components/landing/ResultExample'
import NightSupport from '@/components/landing/NightSupport'
import FurtherProducts from '@/components/landing/FurtherProducts'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'
import { getActiveProducts } from '@/lib/products'
import { COURSE_VIDEOS } from '@/data/courseVideos'
import { signedEmbedUrl } from '@/lib/bunny'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'безсоння.net — Безкоштовний тест типу безсоння',
  description: '10 запитань — і ви дізнаєтесь свій тип безсоння, причину та конкретний план дій. Без реєстрації, безкоштовно.',
}

const AUDIO_IDS = ['night_support_fall_asleep', 'night_support_woke_up', 'night_support_before_sleep']
const FURTHER_IDS = ['sleep_return_protocol', 'sleep_7_nights_recovery', 'course']

// Кілька уроків як прев'ю на лендінгу — решта відкривається після оплати.
const PREVIEW_COUNT = 3

export default async function HomePage() {
  // Підписуємо на сервері: ключ у браузер не потрапляє, посилання живуть кілька годин.
  const previewVideos = COURSE_VIDEOS.slice(0, PREVIEW_COUNT).map((v) => ({
    title: v.title,
    url: signedEmbedUrl(v.id),
  }))

  const allProducts = await getActiveProducts()
  const activeIds = new Set(allProducts.map((p) => p.id))

  const audioProducts = allProducts.filter((p) => AUDIO_IDS.includes(p.id))
  const furtherProducts = allProducts.filter((p) => FURTHER_IDS.includes(p.id))

  // Only show sections if they have at least one active product
  const showNightSupport = audioProducts.length > 0
  const showFurtherProducts = furtherProducts.length > 0
  const showCourse = activeIds.has('course')

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatTestGives />
        <HowItWorks />
        <SleepTypes />
        <VideoGallery videos={previewVideos} />
        <TrustBlock />
        <ResultExample />
        {showNightSupport && <NightSupport products={audioProducts} />}
        {showFurtherProducts && <FurtherProducts products={furtherProducts} showCourse={showCourse} />}
        <FAQ />
      </main>
      <Footer />
      <FloatingBot />
    </>
  )
}
