import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'
import { OrderRow, ProductRow, TestResultRow } from '@/types'
import AdminProductsForm from './AdminProductsForm'
import AdminLogout from './AdminLogout'

async function getAdminData() {
  const supabase = createSupabaseAdminClient()

  const [ordersRes, testResultsRes, productsRes] = await Promise.all([
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('test_results')
      .select('result_type, created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase
      .from('products')
      .select('*')
      .order('price', { ascending: true })
  ])

  return {
    orders: (ordersRes.data || []) as OrderRow[],
    testResults: (testResultsRes.data || []) as Pick<TestResultRow, 'result_type' | 'created_at'>[],
    products: (productsRes.data || []) as ProductRow[]
  }
}

const RESULT_LABELS: Record<string, string> = {
  tense_falling_asleep: 'Напружене засинання',
  night_waking: 'Нічні пробудження',
  early_rising: 'Ранні пробудження',
  broken_sleep: 'Розбитий сон',
  anxiety_before_sleep: 'Тривога перед сном'
}

export default async function AdminPage() {
  const { orders, testResults, products } = await getAdminData()

  const paidOrders = orders.filter((o) => o.status === 'paid')
  const pendingOrders = orders.filter((o) => o.status === 'pending')
  const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.amount), 0)

  // Test results by type (last 30 days)
  const resultCounts: Record<string, number> = {}
  for (const r of testResults) {
    resultCounts[r.result_type] = (resultCounts[r.result_type] || 0) + 1
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Адмін-панель</h1>
          <AdminLogout />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Оплачено', value: paidOrders.length, color: 'text-green-600' },
            { label: 'Очікує', value: pendingOrders.length, color: 'text-yellow-600' },
            { label: 'Всього замовлень', value: orders.length, color: 'text-slate-900' },
            { label: 'Виручка (грн)', value: totalRevenue, color: 'text-indigo-600' }
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Test results stats */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="font-bold text-slate-900 mb-4">Результати тестів (30 днів)</h2>
          {Object.keys(resultCounts).length === 0 ? (
            <p className="text-slate-500 text-sm">Немає даних</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(resultCounts).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2">
                  <span className="text-sm text-slate-700">{RESULT_LABELS[type] || type}</span>
                  <span className="font-bold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products editor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="font-bold text-slate-900 mb-4">Продукти</h2>
          <AdminProductsForm products={products} />
        </div>

        {/* Orders table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">Замовлення</h2>
          {orders.length === 0 ? (
            <p className="text-slate-500 text-sm">Замовлень немає</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                    <th className="pb-2 pr-4">ID замовлення</th>
                    <th className="pb-2 pr-4">Продукт</th>
                    <th className="pb-2 pr-4">Сума</th>
                    <th className="pb-2 pr-4">Статус</th>
                    <th className="pb-2 pr-4">Email</th>
                    <th className="pb-2">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-2 pr-4 font-mono text-xs text-slate-500">{order.order_id.slice(0, 20)}…</td>
                      <td className="py-2 pr-4">{order.product_id}</td>
                      <td className="py-2 pr-4 font-medium">{order.amount} грн</td>
                      <td className="py-2 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-slate-500">{order.email || '—'}</td>
                      <td className="py-2 text-slate-500 text-xs">
                        {new Date(order.created_at).toLocaleDateString('uk-UA')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
