import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-slate-900 text-lg tracking-tight">
          безсоння<span className="text-indigo-500">.net</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <Link href="/#how-it-works" className="hover:text-slate-900 transition-colors">Як це працює</Link>
          <Link href="/course" className="hover:text-slate-900 transition-colors">Курс лікаря</Link>
          <Link href="/contacts" className="hover:text-slate-900 transition-colors">Контакти</Link>
        </nav>
        <Link
          href="/test"
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Пройти тест
        </Link>
      </div>
    </header>
  )
}
