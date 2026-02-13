import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  // Calculate next month's partition dates
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const monthAfter = new Date(now.getFullYear(), now.getMonth() + 2, 1)

  const partName = `server_metrics_${nextMonth.getFullYear()}_${String(nextMonth.getMonth() + 1).padStart(2, '0')}`
  const fromDate = nextMonth.toISOString().split('T')[0]
  const toDate = monthAfter.toISOString().split('T')[0]

  const sql = `
    CREATE TABLE IF NOT EXISTS ${partName} PARTITION OF server_metrics
    FOR VALUES FROM ('${fromDate}') TO ('${toDate}');
    ALTER TABLE ${partName} ENABLE ROW LEVEL SECURITY;
  `

  const { error } = await supabase.rpc('exec_sql' as never, { query: sql } as never)

  if (error) {
    // Partition may already exist — not a fatal error
    console.error('Partition creation result:', error.message)
  }

  return NextResponse.json({
    partition: partName,
    range: `${fromDate} to ${toDate}`,
  })
}
