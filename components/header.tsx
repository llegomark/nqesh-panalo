import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container max-w-4xl mx-auto py-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">NQESH Reviewer</span>
        </Link>
      </div>
    </header>
  )
}
