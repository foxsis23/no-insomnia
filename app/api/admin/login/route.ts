import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { password } = await req.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
