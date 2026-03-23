import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'безсоння.net — Дізнайтесь свій тип безсоння',
  description: 'Безкоштовний тест з 10 запитань. Дізнайтесь свій тип безсоння, його причину та конкретні кроки для відновлення нормального сну.',
  openGraph: {
    title: 'безсоння.net — Дізнайтесь свій тип безсоння',
    description: 'Безкоштовний тест з 10 запитань. Персоналізований розбір та план дій.',
    locale: 'uk_UA',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">{children}</body>
    </html>
  )
}
