const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apimedsys.com.ua'
const SITE_HOST =
  process.env.NEXT_PUBLIC_SITE_HOST || 'no-insomnia.net'

interface ApiEnvelope<T> {
  success: boolean
  data?: T
  error?: string
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  params?: Record<string, string | number | undefined>
  token?: string | null
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
  const url = new URL(path.replace(/^\//, ''), API_BASE_URL + '/')
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v))
    }
  }
  return url.toString()
}

function readSessionToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('session-store')
    if (!raw) return null
    const parsed = JSON.parse(raw) as { state?: { sessionToken?: string } }
    return parsed?.state?.sessionToken ?? null
  } catch {
    return null
  }
}

export async function apiRequest<T>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-forwarded-host': SITE_HOST,
    ...opts.headers,
  }

  const token = opts.token ?? readSessionToken()
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(buildUrl(path, opts.params), {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: 'no-store',
  })

  let json: ApiEnvelope<T> | T
  try {
    json = (await res.json()) as ApiEnvelope<T> | T
  } catch {
    throw new Error(`API ${res.status} ${res.statusText}`)
  }

  if (json && typeof json === 'object' && 'success' in (json as ApiEnvelope<T>)) {
    const env = json as ApiEnvelope<T>
    if (!env.success) throw new Error(env.error ?? 'API error')
    return env.data as T
  }
  if (!res.ok) throw new Error(`API ${res.status}`)
  return json as T
}

export const apiClient = {
  get: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'GET' }),
  post: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'POST', body }),
  patch: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'PATCH', body }),
  delete: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'DELETE' }),
}
