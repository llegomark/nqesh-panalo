// app/reviewer/[category]/results/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation"; // Import redirect
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
import type { Question, Category } from "@/lib/types";
import { getCategory, getCategoryQuestions } from "@/lib/data"; // Use direct data access

// Define type for parsed user answers
type UserAnswer = {
  questionId: string;
  userAnswer: string | null;
};

// Define type for the combined results data
type CombinedResult = Question & { userAnswer: string | null };

interface ResultsPageProps {
    // Correctly define props as Promises for async Server Components
    params: Promise<{ category: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


// --- Main Page Component (Server Component) ---
export default async function ResultsPage({ params, searchParams }: ResultsPageProps) {

  // --- Await props immediately ---
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { category: categoryId } = resolvedParams;
  // --- End Awaiting props ---

  // --- Data Fetching and Processing on Server ---
  let score: number = 0;
  let total: number = 0;
  let category: Category | undefined;
  let combinedResults: CombinedResult[] = [];
  let error: string | null = null;

  try {
    // Access awaited searchParams
    const scoreParam = resolvedSearchParams?.score;
    const totalParam = resolvedSearchParams?.total;
    const answersParam = resolvedSearchParams?.answers;

    if (typeof scoreParam !== 'string' || typeof totalParam !== 'string' || typeof answersParam !== 'string' || !categoryId) {
        throw new Error("Missing required results data in URL.");
    }

    score = parseInt(scoreParam, 10);
    total = parseInt(totalParam, 10);

     if (isNaN(score) || isNaN(total)) {
       throw new Error("Invalid score or total value.");
     }

    // Ensure answersParam is valid base64 before decoding
    let decodedAnswers: UserAnswer[];
    try {
        decodedAnswers = JSON.parse(atob(answersParam));
    } catch (e) {
        throw new Error("Invalid answers data format.")
    }


    // Fetch category and questions directly
    category = getCategory(categoryId);
    const questions = getCategoryQuestions(categoryId);

    if (!category) {
        notFound(); // Use notFound for missing category
    }

    if (questions.length === 0 || questions.length !== total) {
       console.warn(`Question count mismatch or no questions found for category ${categoryId}. URL total: ${total}, Fetched: ${questions.length}`);
       // Adjust total based on fetched questions if mismatch, handle zero case
       total = questions.length;
       if (total === 0) {
          // Redirect if no questions found, or show specific message
          // redirect(`/reviewer/${categoryId}?error=no_questions`);
          throw new Error("No questions found for this category review.");
       }
    }

    // Combine fetched questions with user answers
    combinedResults = questions.map((q) => {
      const userAnswerData = decodedAnswers.find(a => a.questionId === q.id);
      return {
        ...q,
        userAnswer: userAnswerData ? userAnswerData.userAnswer : null,
      };
    });

  } catch (err: any) {
    console.error("Error processing results page:", err);
    error = err.message || "Failed to load results data.";
    // Render error state below
  }
  // --- End Data Fetching ---

  // --- Render Error State ---
  if (error) {
    return (
      <div className="container max-w-3xl mx-auto py-12 px-4 text-center">
        <p className="text-red-600">{error}</p>
        {/* Provide relevant actions based on error context */}
        {categoryId ? (
             <Link href={`/reviewer/${categoryId}`} className="mt-4 inline-block mr-2">
                <Button variant="outline">Try Review Again</Button>
            </Link>
        ) : null}
        <Link href="/" className="mt-4 inline-block">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  // --- Render Success State ---
  // Handle singular/plural forms
  const correctAnswerText = score === 1 ? "1 correct answer" : `${score} correct answers`;
  const questionText = total === 1 ? "1 question" : `${total} questions`;
  const percentageScore = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Your Results</h1>
        <p className="text-muted-foreground">{category?.title} Reviewer Summary</p>
      </div>

      {/* Performance Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>
            You scored {score} out of {total} {total === 1 ? "question" : "questions"}
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
            <Button variant="outline" className="w-full">Try Again</Button>
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
              {/* === ORIGINAL STYLING LOGIC RESTORED === */}
              <div className="space-y-4">
                {question.options.map((opt) => {
                  const isCorrect = opt.id === question.correctAnswer;
                  const isChosen = opt.id === question.userAnswer;

                  let optionStyle = "w-full text-left p-4 rounded-md border transition-colors mb-3 flex items-center ";

                  if (isCorrect) {
                    optionStyle += "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700";
                  } else if (isChosen) {
                    optionStyle += "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700";
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
              {/* === END OF ORIGINAL STYLING LOGIC === */}

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
                      <h3 className="font-medium text-sm text-muted-foreground">Source:</h3>
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