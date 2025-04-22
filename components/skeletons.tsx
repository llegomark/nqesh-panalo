// components/skeletons.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PerformanceSummarySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
        <Skeleton className="h-4 w-3/4 mt-2" />
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
        <Skeleton className="h-9 w-full sm:w-28" />
        <Skeleton className="h-9 w-full sm:w-36" />
      </CardFooter>
    </Card>
  );
}

export function PerformanceInsightsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {/* Skeleton for Time Spent Chart Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2 mb-2" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-64 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
      {/* Skeleton for Performance Breakdown Chart Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2 mb-2" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-64 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
      {/* Skeleton for Time vs Question Performance Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-72 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}

export function QuestionListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="text-lg font-bold">
              <Skeleton className="h-6 w-full" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-5">
            {/* Options */}
            {Array.from({ length: 4 }).map((_, j) => (
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
