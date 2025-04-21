// FILE: components/reviewer-content.tsx
"use client";

import { useState, useTransition, useCallback, useEffect } from "react"; // Added useEffect
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Question, AnswerWithTime } from "@/lib/types"; // Added AnswerWithTime
import { Timer } from "@/components/timer";
import { ExternalLink, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { saveReviewResults } from "@/lib/actions/reviewer"; // Import the Server Action
import { toast } from "sonner"; // Import toast for notifications

interface ReviewerContentProps {
  categoryId: string;
  initialQuestions: Question[];
}

export function ReviewerContent({
  categoryId,
  initialQuestions,
}: ReviewerContentProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to track time spent on each question
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>(
    {},
  );

  // ** Store startTime for accurate time calculation **
  const [startTime, setStartTime] = useState<number>(Date.now());

  // ** Reset startTime when question changes **
  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  // Time update handler - simpler and more direct
  const handleTimeUpdate = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (
      !currentQuestion ||
      currentQuestionIndex < 0 ||
      currentQuestionIndex >= questions.length ||
      isAnswered ||
      timeExpired
    )
      return; // Prevent updates after answering/time expiry

    // Calculate elapsed time *more accurately*
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const maxDuration = 120; // Assuming Timer duration is 120s
    const timeSpent = Math.min(elapsedSeconds, maxDuration); // Cap at max duration

    // Store the time data for the current question
    setQuestionTimes((prev) => ({
      ...prev,
      [currentQuestion.id]: timeSpent,
    }));
  }, [currentQuestionIndex, questions, isAnswered, timeExpired, startTime]);

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered || timeExpired) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerId === currentQuestion.correctAnswer;

    // ** Calculate final time spent when answering **
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const maxDuration = 120; // Assuming Timer duration is 120s
    const finalTimeSpent = Math.min(elapsedSeconds, maxDuration);

    const updatedQuestions = questions.map((q, index) =>
      index === currentQuestionIndex ? { ...q, userAnswer: answerId } : q,
    );
    setQuestions(updatedQuestions);

    setSelectedAnswer(answerId);
    setIsAnswered(true);

    // ** Store final time when answering **
    setQuestionTimes((prev) => ({
      ...prev,
      [currentQuestion.id]: finalTimeSpent,
    }));

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeExpired(false);
    } else {
      // Submit results using Server Action
      startTransition(() => {
        submitResults();
      });
    }
  };

  const handleTimeExpired = () => {
    if (!isAnswered) {
      const currentQuestion = questions[currentQuestionIndex];
      // Mark as unanswered and store max time
      const updatedQuestions = questions.map((q, index) =>
        index === currentQuestionIndex ? { ...q, userAnswer: null } : q,
      );
      setQuestions(updatedQuestions);
      setQuestionTimes((prev) => ({
        ...prev,
        [currentQuestion.id]: 120, // Record max time
      }));
    }
    setTimeExpired(true);
    setIsAnswered(true); // Mark as answered to show explanation/next button
  };

  const submitResults = async () => {
    setIsSubmitting(true);
    toast.info("Submitting your results..."); // Add user feedback

    // Ensure final time for the last question is recorded if answered quickly before moving on
    const lastQuestionId = questions[questions.length - 1]?.id;
    if (lastQuestionId && !questionTimes[lastQuestionId] && isAnswered) {
      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
      const maxDuration = 120;
      questionTimes[lastQuestionId] = Math.min(elapsedSeconds, maxDuration);
    }

    // Gather user answers with time data
    const userAnswers: AnswerWithTime[] = questions.map((q) => ({
      questionId: q.id,
      userAnswer: q.userAnswer !== undefined ? q.userAnswer : null, // Ensure userAnswer is present or null
      timeSpent:
        questionTimes[q.id] ||
        (q.userAnswer === undefined && timeExpired ? 120 : 0), // Default or max time
    }));

    console.log("Submitting data via Server Action:", {
      categoryId,
      score,
      total: questions.length,
      answers: userAnswers,
    });

    try {
      const result = await saveReviewResults({
        categoryId,
        score,
        total: questions.length,
        answers: userAnswers,
      });

      if (result.success && result.id) {
        console.log("Results saved successfully, redirecting...");
        toast.success("Results submitted successfully!");
        router.push(`/reviewer/${categoryId}/results/${result.id}`);
      } else {
        console.error(
          "Error submitting results via Server Action:",
          result.error,
        );
        toast.error(
          `Failed to submit results: ${result.error || "Unknown error"}`,
        );
        // Optionally, handle fallback to searchParams method here if needed,
        // but the goal is to rely on the ID method.
      }
    } catch (error) {
      console.error("Error calling Server Action:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(`An unexpected error occurred: ${errorMessage}`);
      // Handle unexpected errors during the action call
    } finally {
      setIsSubmitting(false);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No questions available for this category.</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          Back to Categories
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <Timer
            key={currentQuestionIndex} // Use key to force reset timer on question change
            duration={120} // Example duration: 2 minutes
            onExpire={handleTimeExpired}
            onTimeUpdate={handleTimeUpdate} // Pass the simpler handler
            stopped={isAnswered || timeExpired}
          />
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option) => {
            const isCorrectAnswer = option.id === currentQuestion.correctAnswer;
            const isSelectedAnswer = selectedAnswer === option.id;

            let buttonStyle =
              "w-full text-left p-4 rounded-md border transition-colors ";

            if (isAnswered || timeExpired) {
              if (isCorrectAnswer) {
                buttonStyle +=
                  "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700";
              } else if (isSelectedAnswer) {
                buttonStyle +=
                  "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700";
              } else {
                buttonStyle += "hover:bg-muted/50";
              }
            } else {
              buttonStyle += "hover:bg-muted/50";
            }

            return (
              <button
                key={option.id}
                className={buttonStyle}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={
                  isAnswered || timeExpired || isPending || isSubmitting
                }
                aria-pressed={selectedAnswer === option.id}
              >
                <span className="text-wrap">{option.text}</span>
              </button>
            );
          })}
        </CardContent>

        {(isAnswered || timeExpired) && (
          <CardFooter className="flex flex-col items-start border-t pt-4">
            <div className="py-4 w-full space-y-4">
              <div>
                <h3 className="font-medium mb-2">Explanation:</h3>
                <p>{currentQuestion.explanation}</p>
              </div>

              {currentQuestion.source && (
                <div className="pt-2 border-t">
                  <h3 className="font-medium mb-2">Source:</h3>
                  <div className="flex items-center gap-2">
                    <span>{currentQuestion.source.name}</span>
                    {currentQuestion.source.url && (
                      <a
                        href={currentQuestion.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary/80"
                        aria-label={`View source for question ${
                          currentQuestionIndex + 1
                        }`}
                      >
                        <ExternalLink className="h-4 w-4 ml-1" />
                        <span className="sr-only">Open source link</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Button
              onClick={handleNextQuestion}
              className="ml-auto w-full sm:w-auto"
              disabled={isPending || isSubmitting}
            >
              {isPending || isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processing...
                </>
              ) : currentQuestionIndex < questions.length - 1 ? (
                "Next Question"
              ) : (
                "View Results"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
