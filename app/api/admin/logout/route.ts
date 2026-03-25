import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse> {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', '', { maxAge: 0 })
  return res
}
