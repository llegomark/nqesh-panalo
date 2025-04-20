import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] max-w-md text-center gap-6">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">The page you're looking for doesn't exist.</p>
      <p className="text-muted-foreground">The reviewer section or category you requested could not be found.</p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}
