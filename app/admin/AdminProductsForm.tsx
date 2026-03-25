'use client'

import { useState } from 'react'
import { ProductRow } from '@/types'

interface Props {
  products: ProductRow[]
}

export default function AdminProductsForm({ products }: Props) {
  const [rows, setRows] = useState<ProductRow[]>(products)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function updateRow(id: string, field: keyof ProductRow, value: string | number | boolean) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  async function saveProduct(product: ProductRow) {
    setSaving(product.id)
    setError(null)
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: product.price,
          active: product.active,
          content_url: product.content_url
        })
      })
      if (!res.ok) throw new Error('Failed')
      setSaved(product.id)
      setTimeout(() => setSaved(null), 2000)
    } catch {
      setError(product.id)
    } finally {
      setSaving(null)
    }
  }

  return (
    <div className="space-y-3">
      {rows.map((product) => (
        <div key={product.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium text-slate-900 text-sm">{product.name}</p>
              <p className="text-xs text-slate-400">{product.id}</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-slate-500">Активний</span>
              <input
                type="checkbox"
                checked={product.active}
                onChange={(e) => updateRow(product.id, 'active', e.target.checked)}
                className="w-4 h-4 accent-indigo-500"
              />
            </label>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-slate-500 block mb-1">Ціна (грн)</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => updateRow(product.id, 'price', Number(e.target.value))}
                className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Посилання на контент</label>
              <input
                type="url"
                value={product.content_url || ''}
                onChange={(e) => updateRow(product.id, 'content_url', e.target.value)}
                placeholder="https://..."
                className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => saveProduct(product)}
              disabled={saving === product.id}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving === product.id ? 'Збереження...' : 'Зберегти'}
            </button>
            {saved === product.id && (
              <span className="text-green-600 text-xs">Збережено ✓</span>
            )}
            {error === product.id && (
              <span className="text-red-500 text-xs">Помилка збереження</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
