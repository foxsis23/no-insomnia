import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { sessionId, resultType, answers } = body

    // In production: save to Supabase test_results table
    console.log('[test-result] saving:', { sessionId, resultType, answersCount: answers?.length })

    return NextResponse.json({ id: `mock_${Date.now()}`, status: 'saved' })
  } catch (error) {
    console.error('[test-result] error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
