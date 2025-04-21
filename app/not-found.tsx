import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center gap-6">
        <div className="rounded-full bg-muted p-4 w-20 h-20 flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground" />
        </div>

        <h1 className="text-4xl font-bold">404</h1>

        <div className="space-y-2">
          <p className="text-xl">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-muted-foreground">
            The reviewer section or category you requested could not be found.
          </p>
        </div>

        <Link href="/" className="mt-4">
          <Button size="lg">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
