// app/reviewer/[category]/results/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Loading() {
  // Skeleton structure remains unchanged
  return (
    <div className="container max-w-3xl mx-auto py-6 px-4 space-y-8 animate-pulse">
      {/* Skeleton for Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/5" />
        <Skeleton className="h-4 w-2/5" />
      </div>
      {/* Skeleton for Performance Summary Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-16 w-24 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <Skeleton className="h-10 w-full sm:w-24" />
          <Skeleton className="h-10 w-full sm:w-36" />
        </CardFooter>
      </Card>
      {/* Skeleton for Question Review Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      {/* Skeleton for Question Cards (show a few) */}
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="bg-muted/30 p-4">
            <Skeleton className="h-6 w-full" />
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 space-y-3">
            {/* Option Skeletons */}
            <div className="flex items-center space-x-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 flex-grow" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 flex-grow" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 flex-grow" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 flex-grow" />
            </div>
            {/* Explanation Skeleton */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/30 rounded-md border">
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
            {/* Source Skeleton */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
