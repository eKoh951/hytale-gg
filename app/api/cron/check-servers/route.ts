import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as net from 'net'

export const runtime = 'nodejs'

function checkTcpStatus(ip: string, port: number, timeoutMs = 5000): Promise<{ online: boolean; latencyMs: number }> {
  return new Promise((resolve) => {
    const start = Date.now()
    const socket = new net.Socket()

    socket.setTimeout(timeoutMs)

    socket.on('connect', () => {
      const latencyMs = Date.now() - start
      socket.destroy()
      resolve({ online: true, latencyMs })
    })

    socket.on('timeout', () => {
      socket.destroy()
      resolve({ online: false, latencyMs: timeoutMs })
    })

    socket.on('error', () => {
      socket.destroy()
      resolve({ online: false, latencyMs: Date.now() - start })
    })

    socket.connect(port, ip)
  })
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createClient()

  const { data: servers } = await supabase
    .from('servers')
    .select('id, ip_address, port')
    .limit(100)

  if (!servers?.length) {
    return NextResponse.json({ checked: 0 })
  }

  const results = await Promise.allSettled(
    servers.map(async (server) => {
      const { online, latencyMs } = await checkTcpStatus(
        server.ip_address,
        server.port ?? 24454
      )
      const status = online ? 'online' : 'offline'

      await Promise.all([
        supabase.from('server_metrics').insert({
          server_id: server.id,
          status,
          latency_ms: latencyMs,
          player_count: null,
        }),
        supabase
          .from('servers')
          .update({ current_status: status })
          .eq('id', server.id),
      ])

      return { id: server.id, status, latencyMs }
    })
  )

  const fulfilled = results.filter((r) => r.status === 'fulfilled').length

  return NextResponse.json({ checked: fulfilled, total: servers.length })
}
