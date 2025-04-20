"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/types"
import { Timer } from "@/components/timer"
import { shuffleArray } from "@/lib/utils"
import { ExternalLink, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ReviewerContentProps {
  categoryId: string
}

export function ReviewerContent({ categoryId }: ReviewerContentProps) {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [timeExpired, setTimeExpired] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Ensure we have a proper URL with protocol
        const protocol = window.location.protocol
        const host = window.location.host
        const baseUrl = `${protocol}//${host}`

        const response = await fetch(`${baseUrl}/api/reviewer/${categoryId}`)

        if (!response.ok) throw new Error("Failed to fetch questions")

        const data = await response.json()

        // Shuffle questions and options
        const shuffledQuestions = shuffleArray([...data]).map((question) => ({
          ...question,
          options: shuffleArray([...question.options]),
          userAnswer: null,
        }))

        setQuestions(shuffledQuestions)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching questions:", error)
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [categoryId])

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswered || timeExpired) return

    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestionIndex].userAnswer = answerId
    setQuestions(updatedQuestions)

    setSelectedAnswer(answerId)
    setIsAnswered(true)

    if (answerId === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setTimeExpired(false)
    } else {
      // Prepare results data
      const resultsData = {
        score,
        total: questions.length,
        questions,
      }

      // Encode the data to pass via URL
      const encodedData = btoa(JSON.stringify(resultsData))

      // Navigate to results page
      router.push(`/reviewer/${categoryId}/results?data=${encodedData}`)
    }
  }

  const handleTimeExpired = () => {
    setTimeExpired(true)
    setIsAnswered(true)

    // Mark the current question as unanswered if no selection was made
    if (!selectedAnswer) {
      const updatedQuestions = [...questions]
      updatedQuestions[currentQuestionIndex].userAnswer = null
      setQuestions(updatedQuestions)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No questions available for this category.</p>
        <Button className="mt-4" onClick={() => router.push("/")}>
          Back to Categories
        </Button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

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
            duration={120}
            onExpire={handleTimeExpired}
            key={currentQuestionIndex}
            stopped={isAnswered} // Stop timer when answer is selected
          />
        </div>

        {/* Add progress bar for overall question count */}
        <Progress value={(currentQuestionIndex / (questions.length - 1)) * 100} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option) => {
            // Determine if this option is the correct answer
            const isCorrectAnswer = option.id === currentQuestion.correctAnswer
            // Determine if this is the selected answer
            const isSelectedAnswer = selectedAnswer === option.id
            // Determine the styling based on whether the question is answered and which option this is
            let buttonStyle = "w-full text-left p-4 rounded-md border transition-colors "

            if (isAnswered || timeExpired) {
              if (isCorrectAnswer) {
                // Always highlight the correct answer in green when question is answered
                buttonStyle += "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700"
              } else if (isSelectedAnswer) {
                // Highlight the selected wrong answer in red
                buttonStyle += "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
              } else {
                buttonStyle += "hover:bg-muted/50"
              }
            } else {
              buttonStyle += "hover:bg-muted/50"
            }

            return (
              <button
                key={option.id}
                className={buttonStyle}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={isAnswered || timeExpired}
              >
                {option.text}
              </button>
            )
          })}
        </CardContent>
        {(isAnswered || timeExpired) && (
          <CardFooter className="flex flex-col items-start border-t">
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
                      >
                        <ExternalLink className="h-4 w-4 ml-1" />
                        <span className="sr-only">Open source link</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleNextQuestion} className="ml-auto">
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
