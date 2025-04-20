"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NQESH Reviewer for Aspiring School Heads
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
