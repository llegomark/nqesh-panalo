'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

// Note: Error boundaries must be Client Components
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log immediately
  console.error('Global error:', error)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="max-w-md text-center space-y-6 p-6 bg-card border border-border rounded-lg shadow">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => reset()}>
              Try Again
            </Button>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
