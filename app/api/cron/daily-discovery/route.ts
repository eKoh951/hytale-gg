import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  // 1. Recalculate quality scores for all servers
  const { data: servers } = await supabase
    .from('servers')
    .select('id')

  if (servers?.length) {
    const scoreUpdates = await Promise.allSettled(
      servers.map(async (server) => {
        const { data: scoreResult } = await supabase
          .rpc('calculate_quality_score', { p_server_id: server.id })

        if (scoreResult !== null && scoreResult !== undefined) {
          await supabase
            .from('servers')
            .update({ quality_score: scoreResult })
            .eq('id', server.id)
        }
        return server.id
      })
    )
  }

  // 2. Select featured servers (top 3 by quality score, not featured in last 7 days)
  const { data: recentlyFeatured } = await supabase
    .from('featured_servers')
    .select('server_id')
    .gte('featured_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .eq('section', 'featured')

  const recentIds = new Set((recentlyFeatured ?? []).map((f) => f.server_id))

  const { data: topServers } = await supabase
    .from('servers')
    .select('id, quality_score')
    .eq('verification_status', 'verified')
    .order('quality_score', { ascending: false })
    .limit(20)

  const featuredCandidates = (topServers ?? [])
    .filter((s) => !recentIds.has(s.id))
    .slice(0, 3)

  // 3. Select hidden gems (good quality but low review count, not recently featured)
  const { data: gemCandidates } = await supabase
    .from('servers')
    .select('id, quality_score, review_count')
    .eq('verification_status', 'verified')
    .lt('review_count', 5)
    .gt('quality_score', 0)
    .order('quality_score', { ascending: false })
    .limit(20)

  const gems = (gemCandidates ?? [])
    .filter((s) => !recentIds.has(s.id) && !featuredCandidates.some((f) => f.id === s.id))
    .slice(0, 4)

  // 4. Insert featured_servers rows
  const inserts = [
    ...featuredCandidates.map((s, i) => ({
      server_id: s.id,
      featured_date: today,
      position: i + 1,
      section: 'featured' as const,
      quality_score_at_feature: s.quality_score,
    })),
    ...gems.map((s, i) => ({
      server_id: s.id,
      featured_date: today,
      position: i + 1,
      section: 'hidden_gem' as const,
      quality_score_at_feature: s.quality_score,
    })),
  ]

  let insertedCount = 0
  if (inserts.length > 0) {
    const { error } = await supabase.from('featured_servers').insert(inserts)
    if (error) {
      console.error('Error inserting featured servers:', error)
    } else {
      insertedCount = inserts.length
    }

    // Update last_featured_at on servers
    const featuredIds = inserts.map((i) => i.server_id)
    await supabase
      .from('servers')
      .update({ last_featured_at: new Date().toISOString() })
      .in('id', featuredIds)
  }

  return NextResponse.json({
    date: today,
    scoresUpdated: servers?.length ?? 0,
    featured: featuredCandidates.length,
    hiddenGems: gems.length,
    inserted: insertedCount,
  })
}
