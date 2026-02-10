import { createClient } from './server'

export type AppRole = 'admin' | 'moderator'

/**
 * Check if the current user has a specific role by reading the JWT custom claim.
 * The `user_role` claim is injected by the custom_access_token_hook.
 * Falls back to a DB query if the claim is not present (e.g. stale token).
 */
export async function getUserRole(): Promise<AppRole | null> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) return null

  // Primary: decode JWT access token for user_role claim
  // (injected by custom_access_token_hook, lives in JWT payload — not in app_metadata)
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    try {
      const payload = JSON.parse(atob(session.access_token.split('.')[1]))
      if (payload.user_role) return payload.user_role as AppRole
    } catch {
      // Token decode failed — fall through to DB
    }
  }

  // Fallback: query user_roles table directly
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  return (data?.role as AppRole) ?? null
}

/**
 * Check if the current authenticated user is an admin.
 */
export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole()
  return role === 'admin'
}

/**
 * Check if the current authenticated user is at least a moderator (admin or moderator).
 */
export async function isModeratorOrAbove(): Promise<boolean> {
  const role = await getUserRole()
  return role === 'admin' || role === 'moderator'
}
