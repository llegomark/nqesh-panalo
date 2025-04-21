// components/footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Site Info */}
          <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Eduventure Web Development Services. All rights reserved.
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-6">
            <Link
              href="/"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/copyright"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
            >
              Copyright
            </Link>
            <Link
              href="#"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
