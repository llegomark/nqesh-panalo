// components/performance-summary.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategory } from "@/lib/data";
import { getResultSummary } from "@/lib/result-data";

export async function PerformanceSummary({
  resultId,
  categoryId,
}: {
  resultId: string;
  categoryId: string;
}) {
  // Fetch summary data
  const resultData = await getResultSummary(resultId);
  const category = await getCategory(categoryId);

  if (!resultData || !category) {
    throw new Error("Failed to load performance summary data");
  }

  const { score, total } = resultData;
  const percentageScore = total > 0 ? Math.round((score / total) * 100) : 0;

  // Handle singular/plural forms
  const correctAnswerText =
    score === 1 ? "1 correct answer" : `${score} correct answers`;
  const questionText = total === 1 ? "1 question" : `${total} questions`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
        <CardDescription>
          You scored {score} out of {total}{" "}
          {total === 1 ? "question" : "questions"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-5xl font-bold">{percentageScore}%</div>
            <p className="text-muted-foreground mt-2">
              {correctAnswerText} out of {questionText}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Link href={`/reviewer/${categoryId}`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            Try Again
          </Button>
        </Link>
        <Link href="/" className="w-full sm:w-auto">
          <Button className="w-full">Back to Categories</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
