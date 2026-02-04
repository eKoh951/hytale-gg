'use client'

import { createContext, useEffect, useState, useCallback, use } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthState {
  user: User | null
  isLoading: boolean
}

interface AuthActions {
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

interface AuthMeta {
  isAuthenticated: boolean
}

interface AuthContextValue {
  state: AuthState
  actions: AuthActions
  meta: AuthMeta
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  })

  const signIn = useCallback(async () => {
    const response = await fetch('/auth/signin', { method: 'POST' })
    const data = await response.json()

    if (data.error) {
      console.error('Sign in error:', data.error)
      return
    }

    if (data.url) {
      window.location.href = data.url
    }
  }, [])

  const signOut = useCallback(async () => {
    const response = await fetch('/auth/signout', { method: 'POST' })
    if (response.ok) {
      window.location.href = '/'
    }
  }, [])

  useEffect(() => {
    const supabase = createClient()

    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setState((prev) => ({
          ...prev,
          user,
          isLoading: false,
        }))
      } catch (error) {
        console.error('Auth check error:', error)
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState((prev) => ({
          ...prev,
          user: session?.user ?? null,
          isLoading: false,
        }))
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const value: AuthContextValue = {
    state,
    actions: {
      signIn,
      signOut,
    },
    meta: {
      isAuthenticated: state.user !== null,
    },
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
