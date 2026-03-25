'use client'

import { useRouter } from 'next/navigation'

export default function AdminLogout() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
    >
      Вийти
    </button>
  )
}
