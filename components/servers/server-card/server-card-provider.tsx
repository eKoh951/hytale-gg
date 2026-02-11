import { createContext, useContext, type ReactNode } from 'react'
import type { ServerWithTags } from '@/lib/data/servers'

const ServerCardContext = createContext<ServerWithTags | null>(null)

export function useServerCard() {
  const ctx = useContext(ServerCardContext)
  if (!ctx) throw new Error('useServerCard must be used within ServerCardProvider')
  return ctx
}

export function ServerCardProvider({
  server,
  children,
}: {
  server: ServerWithTags
  children: ReactNode
}) {
  return (
    <ServerCardContext value={server}>
      {children}
    </ServerCardContext>
  )
}
