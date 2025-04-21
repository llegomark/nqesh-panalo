// components/reviewer-content.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Question } from "@/lib/types";
import { Timer } from "@/components/timer";
// Removed shuffleArray import as it's now handled server-side
import { ExternalLink, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReviewerContentProps {
  categoryId: string;
  initialQuestions: Question[];
}

export function ReviewerContent({ categoryId, initialQuestions }: ReviewerContentProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered || timeExpired) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerId === currentQuestion.correctAnswer;

    const updatedQuestions = questions.map((q, index) =>
        index === currentQuestionIndex ? { ...q, userAnswer: answerId } : q
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
        const userAnswers = questions.map(q => ({ questionId: q.id, userAnswer: q.userAnswer }));
        const resultsParams = new URLSearchParams({
          score: score.toString(),
          total: questions.length.toString(),
          answers: btoa(JSON.stringify(userAnswers)),
        });
        router.push(`/reviewer/${categoryId}/results?${resultsParams.toString()}`);
      }
    });
  };

  const handleTimeExpired = () => {
    if (!isAnswered) {
      const updatedQuestions = questions.map((q, index) =>
        index === currentQuestionIndex ? { ...q, userAnswer: null } : q
      );
      setQuestions(updatedQuestions);
    }
    setTimeExpired(true);
    setIsAnswered(true);
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
          {/* === ORIGINAL STYLING LOGIC RESTORED === */}
          {currentQuestion.options.map((option) => {
            const isCorrectAnswer = option.id === currentQuestion.correctAnswer;
            const isSelectedAnswer = selectedAnswer === option.id;
            // Determine the styling based on whether the question is answered and which option this is
            let buttonStyle = "w-full text-left p-4 rounded-md border transition-colors ";

            if (isAnswered || timeExpired) {
              if (isCorrectAnswer) {
                // Always highlight the correct answer in green when question is answered
                buttonStyle += "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700";
              } else if (isSelectedAnswer) {
                // Highlight the selected wrong answer in red
                buttonStyle += "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700";
              } else {
                buttonStyle += "hover:bg-muted/50";
              }
            } else {
              // Default style before answer is revealed
              buttonStyle += "hover:bg-muted/50";
               // Optionally add distinct style for the selected answer before confirmation
               // if (isSelectedAnswer) { buttonStyle += " ring-2 ring-primary"; }
            }

            return (
              <button
                key={option.id}
                className={buttonStyle}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={isAnswered || timeExpired || isPending}
                aria-pressed={selectedAnswer === option.id}
              >
                <span className="text-wrap">{option.text}</span>
              </button>
            );
          })}
          {/* === END OF ORIGINAL STYLING LOGIC === */}
        </CardContent>

        {(isAnswered || timeExpired) && (
          <CardFooter className="flex flex-col items-start border-t pt-4">
             <div className="py-4 w-full space-y-4"> {/* Changed from pb-0 to py-4 */}
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
              className="ml-auto w-full sm:w-auto" // Make button full width on small screens
              disabled={isPending}
            >
               {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}