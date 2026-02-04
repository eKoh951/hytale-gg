import type { User } from '@supabase/supabase-js'

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getDisplayName(user: User | null): string {
  if (!user) return 'User'
  
  return (
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split('@')[0] ??
    'User'
  )
}
