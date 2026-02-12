import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function getURL() {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000'
  url = url.startsWith('http') ? url : `https://${url}`
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getURL()}auth/callback`,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (data?.url) {
    return NextResponse.json({ url: data.url })
  }

  return NextResponse.json({ error: 'Failed to initiate sign in' }, { status: 400 })
}
