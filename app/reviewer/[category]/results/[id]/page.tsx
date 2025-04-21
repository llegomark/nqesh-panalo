// app/reviewer/[category]/results/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, ExternalLink, X } from "lucide-react";
// Remove unused Question import
import { getCategory, getCategoryQuestions } from "@/lib/data";
import { get } from "@/lib/db";

// Remove unused UserAnswer type

// Define props for the dynamic route
interface ResultsPageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  // Await the params object before destructuring it
  const resolvedParams = await params;
  const { category: categoryId, id } = resolvedParams;

  // Try to fetch results from Redis
  const resultData = await get(`results:${id}`);

  if (!resultData) {
    notFound(); // No results found for this ID
  }

  // Parse the stored results data - if it's already an object, don't parse it
  let resultsObject;
  try {
    // Check if resultData is already an object
    if (typeof resultData === "object" && resultData !== null) {
      resultsObject = resultData;
    } else {
      // Otherwise, parse it as JSON after casting to string
      resultsObject = JSON.parse(resultData as string);
    }
  } catch (error) {
    console.error("Error parsing result data:", error);
    console.log("Original resultData:", resultData);
    notFound(); // Return 404 if we can't parse the data
  }

  const { score, total, answers } = resultsObject;

  // Fetch category and questions directly
  const category = getCategory(categoryId);
  const questions = getCategoryQuestions(categoryId);

  if (!category) {
    notFound(); // Category not found
  }

  // Combine questions with user answers
  const combinedResults = questions.map((q) => {
    const userAnswerData = answers.find(
      (a: { questionId: string; userAnswer: string | null }) =>
        a.questionId === q.id,
    );
    return {
      ...q,
      userAnswer: userAnswerData ? userAnswerData.userAnswer : null,
    };
  });

  // Calculate percentage score
  const percentageScore = total > 0 ? Math.round((score / total) * 100) : 0;

  // Handle singular/plural forms
  const correctAnswerText =
    score === 1 ? "1 correct answer" : `${score} correct answers`;
  const questionText = total === 1 ? "1 question" : `${total} questions`;

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Your Results</h1>
        <p className="text-muted-foreground">
          {category?.title} Reviewer Summary
        </p>
      </div>

      {/* Performance Summary Card */}
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

      {/* Question Review Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Question Review</h2>
        <p className="text-muted-foreground">
          Review all questions and their correct answers
        </p>
      </div>

      <div className="space-y-6">
        {combinedResults.map((question, idx) => (
          <Card key={question.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">
                Question {idx + 1}: {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Options with styling */}
              <div className="space-y-4">
                {question.options.map((opt) => {
                  const isCorrect = opt.id === question.correctAnswer;
                  const isChosen = opt.id === question.userAnswer;

                  let optionStyle =
                    "w-full text-left p-4 rounded-md border transition-colors mb-3 flex items-center ";

                  if (isCorrect) {
                    optionStyle +=
                      "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700";
                  } else if (isChosen) {
                    optionStyle +=
                      "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700";
                  } else {
                    optionStyle += "bg-background border-input";
                  }

                  return (
                    <div key={opt.id} className={optionStyle}>
                      <div className="mr-3">
                        {isCorrect ? (
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : isChosen ? (
                          <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                        ) : (
                          <div className="h-5 w-5"></div>
                        )}
                      </div>
                      <span
                        className={
                          isCorrect
                            ? "font-medium text-green-600 dark:text-green-400"
                            : isChosen
                              ? "font-medium text-red-600 dark:text-red-400"
                              : ""
                        }
                      >
                        <span className="text-wrap">{opt.text}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation section */}
              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p className="text-foreground">{question.explanation}</p>
              </div>

              {/* Source section */}
              {question.source && (
                <div className="mt-4">
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">
                        Source:
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span>{question.source.name}</span>
                      </div>
                    </div>
                    {question.source.url && (
                      <a
                        href={question.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary/80"
                        aria-label={`View source for question ${idx + 1}`}
                      >
                        <span className="mr-1">View Source</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
