"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, X, ExternalLink } from "lucide-react";
import type { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question & {
    userAnswer: string | null;
    timeSpent: number;
  };
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-lg">
          Question {index + 1}: {question.question}
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
                  aria-label={`View source for question ${index + 1}`}
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
  );
}
