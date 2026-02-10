'use client'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 pt-20">
      <AlertTriangle className="size-10 text-destructive" />
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}
