import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-white text-lg tracking-tight">
          безсоння<span className="text-indigo-400">.net</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/#how-it-works" className="hover:text-white transition-colors">Як це працює</Link>
          <Link href="/course" className="hover:text-white transition-colors">Курс лікаря</Link>
          <Link href="/contacts" className="hover:text-white transition-colors">Контакти</Link>
        </nav>
        <Link
          href="/test"
          className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Пройти тест
        </Link>
      </div>
    </header>
  )
}
