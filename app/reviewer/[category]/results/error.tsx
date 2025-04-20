'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Results page error:', error)
  }, [error])

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 text-center">
      <div className="space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">
          We encountered an error loading your results. This might be due to invalid data or a temporary issue.
        </p>
        
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 justify-center pt-4">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}