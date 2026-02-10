import { pick } from 'es-toolkit'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

import { AdminShell } from '@/components/admin/admin-shell'
import { isAdmin } from '@/lib/supabase/admin'

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  // Defense-in-depth: proxy.ts already guards admin routes,
  // but verify again server-side in case of stale session
  const admin = await isAdmin()
  if (!admin) {
    redirect(`/${locale}`)
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider messages={pick(messages as Record<string, unknown>, ['admin'])}>
      <AdminShell>
        {children}
      </AdminShell>
    </NextIntlClientProvider>
  )
}
