// FILE: app/reviewer/[category]/results/[id]/page.tsx

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { checkResultExists } from "@/lib/result-data";
import { getCategory } from "@/lib/data";
import { PerformanceSummary } from "@/components/performance-summary";
import { PerformanceInsightsWrapper } from "@/components/performance-insights-wrapper";
import { QuestionList } from "@/components/question-list";
import {
  PerformanceSummarySkeleton,
  PerformanceInsightsSkeleton,
  QuestionListSkeleton,
} from "@/components/skeletons";

interface ResultsPageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const resolvedParams = await params;
  const { category: categoryId, id } = resolvedParams;

  const category = getCategory(categoryId); // Fetch the category details

  const resultExists = await checkResultExists(id);

  if (!resultExists || !category) {
    // Also check if category was found
    notFound();
  }

  const categoryTitle = category.title; // Get the title

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Your Results</h1>
        {/* Use the fetched category title */}
        <p className="text-muted-foreground">
          {categoryTitle} Reviewer Summary
        </p>
      </div>

      {/* Performance Summary - Loads First */}
      <Suspense fallback={<PerformanceSummarySkeleton />}>
        <PerformanceSummary resultId={id} categoryId={categoryId} />
      </Suspense>

      {/* Performance Insights Section - Loads Second */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Performance Insights</h2>
        <p className="text-muted-foreground">
          Visual analysis of your performance and time management
        </p>
      </div>

      <Suspense fallback={<PerformanceInsightsSkeleton />}>
        <PerformanceInsightsWrapper resultId={id} />
      </Suspense>

      {/* Question Review Section - Loads Last (heaviest) */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Question Review</h2>
        <p className="text-muted-foreground">
          Review all questions and their correct answers
        </p>
      </div>

      <Suspense fallback={<QuestionListSkeleton />}>
        <QuestionList resultId={id} />
      </Suspense>
    </div>
  );
}
