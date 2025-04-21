// app/reviewer/[category]/results/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
// Removed unused Button import
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="container max-w-3xl mx-auto py-6 px-4 space-y-8 select-none">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold opacity-40">Your Results</h1>
        <div className="text-muted-foreground h-5 w-64">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      {/* Performance Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-3/4" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-center space-y-3">
              <Skeleton className="h-16 w-16 mx-auto rounded-full" />
              <Skeleton className="h-4 w-40 mx-auto" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="w-full sm:w-auto">
            <Skeleton className="h-9 w-full sm:w-28" />
          </div>
          <div className="w-full sm:w-auto">
            <Skeleton className="h-9 w-full sm:w-36" />
          </div>
        </CardFooter>
      </Card>

      {/* Question Review Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold opacity-40">Question Review</h2>
        <div className="text-muted-foreground h-5 w-80">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      {/* Question Cards */}
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="text-lg font-bold">
              <Skeleton className="h-6 w-full" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            {/* Options */}
            {[1, 2, 3, 4].map((j) => (
              <div
                key={j}
                className="w-full p-4 rounded-md border border-input bg-background flex items-start"
              >
                <div className="mr-3 mt-0.5">
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <Skeleton className="h-5 w-full max-w-[90%]" />
              </div>
            ))}

            {/* Explanation */}
            <div className="mt-6 p-4 bg-muted/30 rounded-md">
              <div className="font-semibold mb-2">Explanation:</div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
            </div>

            {/* Source */}
            <div className="mt-4">
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-muted-foreground">
                    Source:
                  </div>
                  <div className="mt-1">
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
                <Skeleton className="h-8 w-28 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
