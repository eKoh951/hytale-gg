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

  // Read from JWT custom claim (set by auth hook)
  const role = (user as any).app_metadata?.user_role
    ?? (user as any).user_metadata?.user_role
    ?? null

  if (role) return role as AppRole

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
