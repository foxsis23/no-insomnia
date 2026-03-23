import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import Hero from '@/components/landing/Hero'
import WhatTestGives from '@/components/landing/WhatTestGives'
import HowItWorks from '@/components/landing/HowItWorks'
import SleepTypes from '@/components/landing/SleepTypes'
import TrustBlock from '@/components/landing/TrustBlock'
import ResultExample from '@/components/landing/ResultExample'
import NightSupport from '@/components/landing/NightSupport'
import FurtherProducts from '@/components/landing/FurtherProducts'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'безсоння.net — Безкоштовний тест типу безсоння',
  description: '10 запитань — і ви дізнаєтесь свій тип безсоння, причину та конкретний план дій. Без реєстрації, безкоштовно.',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatTestGives />
        <HowItWorks />
        <SleepTypes />
        <TrustBlock />
        <ResultExample />
        <NightSupport />
        <FurtherProducts />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
