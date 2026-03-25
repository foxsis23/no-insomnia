import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { sessionId, resultType, answers } = body

    if (!sessionId || !resultType || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const supabase = createSupabaseAdminClient()
    const { data, error } = await supabase
      .from('test_results')
      .insert({ session_id: sessionId, result_type: resultType, answers })
      .select('id')
      .single()

    if (error) {
      console.error('[test-result] db error:', error)
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    }

    return NextResponse.json({ id: data.id, status: 'saved' })
  } catch (error) {
    console.error('[test-result] error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
