// FILE: components/reviewer-content.tsx
// Ref: https://github.com/facebook/react/issues/18178#issuecomment-595846312
"use client";

import { useState, useTransition, useCallback, useEffect, useRef } from "react"; // Added dependencies
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Question, AnswerWithTime } from "@/lib/types";
import { Timer } from "@/components/timer";
import { ExternalLink, Loader2, Flag } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { saveReviewResults } from "@/lib/actions/reviewer";
import { reportQuestion } from "@/lib/actions/report";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  // State for the report dialog
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [isReporting, startReportTransition] = useTransition();

  // Refs for avoiding state updates during render
  const questionTimesRef = useRef<Record<string, number>>({});

  // State to track time spent on each question
  const [, setQuestionTimes] = useState<Record<string, number>>({});

  // Memoized startTime ref to avoid re-renders
  const startTimeRef = useRef<number>(Date.now());

  // Set the start time when question changes
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [currentQuestionIndex]);

  // Safe time update handler that won't trigger during render
  const handleTimeUpdate = useCallback(
    (timeSpent: number) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;

      // Update the ref immediately
      questionTimesRef.current = {
        ...questionTimesRef.current,
        [currentQuestion.id]: timeSpent,
      };

      // Schedule the state update
      requestAnimationFrame(() => {
        setQuestionTimes((prev) => ({
          ...prev,
          [currentQuestion.id]: timeSpent,
        }));
      });
    },
    [currentQuestionIndex, questions],
  );

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered || timeExpired) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerId === currentQuestion.correctAnswer;

    // Calculate time spent so far
    const elapsedSeconds = Math.round(
      (Date.now() - startTimeRef.current) / 1000,
    );
    const maxDuration = 120; // Assuming Timer duration is 120s
    const finalTimeSpent = Math.min(elapsedSeconds, maxDuration);

    // Update question state
    const updatedQuestions = questions.map((q, index) =>
      index === currentQuestionIndex ? { ...q, userAnswer: answerId } : q,
    );

    setQuestions(updatedQuestions);
    setSelectedAnswer(answerId);
    setIsAnswered(true);

    // Update time spent using the ref first
    questionTimesRef.current = {
      ...questionTimesRef.current,
      [currentQuestion.id]: finalTimeSpent,
    };

    // Then update state safely
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

  const handleTimeExpired = useCallback(() => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    // Mark as unanswered
    const updatedQuestions = questions.map((q, index) =>
      index === currentQuestionIndex ? { ...q, userAnswer: null } : q,
    );
    setQuestions(updatedQuestions);

    // Record max time using the ref first
    questionTimesRef.current = {
      ...questionTimesRef.current,
      [currentQuestion.id]: 120,
    };

    // Then update state safely
    requestAnimationFrame(() => {
      setQuestionTimes((prev) => ({
        ...prev,
        [currentQuestion.id]: 120,
      }));
      setTimeExpired(true);
      setIsAnswered(true);
    });
  }, [currentQuestionIndex, questions, isAnswered]);

  // Handle report submission
  const handleReportSubmit = () => {
    if (!reportMessage.trim()) {
      toast.error("Please provide details about the issue with this question.");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    startReportTransition(async () => {
      try {
        const result = await reportQuestion({
          questionId: currentQuestion.id,
          categoryId: categoryId,
          questionText: currentQuestion.question,
          message: reportMessage,
          timestamp: Date.now(),
        });

        if (result.success) {
          toast.success(
            "Question reported successfully. Thank you for your feedback.",
          );
          setReportDialogOpen(false);
          setReportMessage("");
        } else {
          toast.error(
            `Failed to submit report: ${result.error || "Unknown error"}`,
          );
        }
      } catch (error) {
        console.error("Error reporting question:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  const submitResults = async () => {
    setIsSubmitting(true);
    toast.info("Submitting your results...");

    // Ensure final time for the last question is recorded if answered quickly
    const lastQuestionId = questions[questions.length - 1]?.id;
    if (
      lastQuestionId &&
      !questionTimesRef.current[lastQuestionId] &&
      isAnswered
    ) {
      const elapsedSeconds = Math.round(
        (Date.now() - startTimeRef.current) / 1000,
      );
      const maxDuration = 120;
      questionTimesRef.current[lastQuestionId] = Math.min(
        elapsedSeconds,
        maxDuration,
      );
    }

    // Use the ref for getting all question times
    const allQuestionTimes = { ...questionTimesRef.current };

    // Gather user answers with time data
    const userAnswers: AnswerWithTime[] = questions.map((q) => ({
      questionId: q.id,
      userAnswer: q.userAnswer !== undefined ? q.userAnswer : null,
      timeSpent:
        allQuestionTimes[q.id] ||
        (q.userAnswer === undefined && timeExpired ? 120 : 0),
    }));

    try {
      const result = await saveReviewResults({
        categoryId,
        score,
        total: questions.length,
        answers: userAnswers,
      });

      if (result.success && result.id) {
        toast.success("Results submitted successfully!");
        router.push(`/reviewer/${categoryId}/results/${result.id}`);
      } else {
        toast.error(
          `Failed to submit results: ${result.error || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Error calling Server Action:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(`An unexpected error occurred: ${errorMessage}`);
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
            key={currentQuestionIndex}
            duration={120}
            onExpire={handleTimeExpired}
            onTimeUpdate={handleTimeUpdate}
            stopped={isAnswered || timeExpired}
          />
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setReportDialogOpen(true)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    aria-label="Report question"
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Report an issue with this question</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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

      {/* Report Question Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Question</DialogTitle>
            <DialogDescription>
              Please explain why this question needs to be reviewed or updated.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Describe the issue with this question (incorrect answer, unclear wording, etc.)"
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setReportDialogOpen(false);
                setReportMessage("");
              }}
              disabled={isReporting}
            >
              Cancel
            </Button>
            <Button onClick={handleReportSubmit} disabled={isReporting}>
              {isReporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
