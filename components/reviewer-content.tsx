// components/reviewer-content.tsx
"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/types";
import { Timer } from "@/components/timer";
import { ExternalLink, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});

  // Time update handler - simpler and more direct
  const handleTimeUpdate = useCallback((timeSpent: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Store the time data for the current question
    setQuestionTimes(prev => ({
      ...prev,
      [currentQuestion.id]: timeSpent
    }));
  }, [currentQuestionIndex, questions]);

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered || timeExpired) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerId === currentQuestion.correctAnswer;

    const updatedQuestions = questions.map((q, index) =>
      index === currentQuestionIndex ? { ...q, userAnswer: answerId } : q,
    );
    setQuestions(updatedQuestions);

    setSelectedAnswer(answerId);
    setIsAnswered(true);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    startTransition(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeExpired(false);
      } else {
        // Submit results to our API
        submitResults();
      }
    });
  };

  const handleTimeExpired = () => {
    if (!isAnswered) {
      const updatedQuestions = questions.map((q, index) =>
        index === currentQuestionIndex ? { ...q, userAnswer: null } : q,
      );
      setQuestions(updatedQuestions);
    }
    setTimeExpired(true);
    setIsAnswered(true);
  };

  const submitResults = async () => {
    try {
      setIsSubmitting(true);

      // Gather user answers with time data
      const userAnswers = questions.map((q) => ({
        questionId: q.id,
        userAnswer: q.userAnswer,
        timeSpent: questionTimes[q.id] || 0,
      }));

      console.log("Submitting data:", { 
        categoryId, 
        score, 
        total: questions.length, 
        answers: userAnswers,
        times: questionTimes 
      });

      const payload = {
        categoryId,
        score,
        total: questions.length,
        answers: userAnswers,
      };

      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save results");
      }

      const { id } = await response.json();
      router.push(`/reviewer/${categoryId}/results/${id}`);
    } catch (error) {
      console.error("Error submitting results:", error);
      // Fallback to the old method if the API fails
      const userAnswers = questions.map((q) => ({
        questionId: q.id,
        userAnswer: q.userAnswer,
        timeSpent: questionTimes[q.id] || 0,
      }));

      const resultsParams = new URLSearchParams({
        score: score.toString(),
        total: questions.length.toString(),
        answers: btoa(JSON.stringify(userAnswers)),
      });

      router.push(
        `/reviewer/${categoryId}/results?${resultsParams.toString()}`,
      );
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
                        aria-label={`View source for question ${currentQuestionIndex + 1}`}
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