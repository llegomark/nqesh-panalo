// components/performance-insights-wrapper.tsx
import { getInsightsData } from "@/lib/result-data";
import { PerformanceInsights } from "@/components/performance-insights";

export async function PerformanceInsightsWrapper({
  resultId,
}: {
  resultId: string;
}) {
  // Fetch insights data - this will trigger suspense
  const insightsData = await getInsightsData(resultId);

  if (!insightsData) {
    throw new Error(
      `Failed to load performance insights data for resultId: ${resultId}`,
    );
  }

  return <PerformanceInsights results={insightsData} />;
}
