'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Profile page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-2 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Profile</CardTitle>
            <CardDescription>
              Something went wrong while loading the profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {error.message || 'An unexpected error occurred'}
            </p>
            <Button onClick={() => reset()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
