"use client"

import { use, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, ExternalLink, X } from "lucide-react"
import type { Question } from "@/lib/types"

export default function ResultsPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  // 1) unwrap the async params
  const { category } = use(params)

  const router = useRouter()
  const searchParams = useSearchParams()

  const [results, setResults] = useState<{
    score: number
    total: number
    questions: Question[]
  } | null>(null)
  const [categoryTitle, setCategoryTitle] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const resultsData = searchParams.get("data")
    if (!resultsData) {
      router.push(`/reviewer/${category}`)
      return
    }

    const controller = new AbortController()
    const signal = controller.signal

    const getResults = async () => {
      try {
        // decode the quiz results from the URL
        const decodedData = JSON.parse(atob(resultsData))
        setResults(decodedData)

        // fetch category details for the title
        try {
          const protocol = window.location.protocol
          const host = window.location.host
          const baseUrl = `${protocol}//${host}`

          const response = await fetch(
            `${baseUrl}/api/reviewer/categories/${category}`,
            { signal }
          )

          if (response.ok) {
            const data = await response.json()
            setCategoryTitle(data.title)
          }
        } catch (err) {
          // Check if this is an abort error, which we can safely ignore
          if (err instanceof DOMException && err.name === 'AbortError') {
            return
          }
          console.error("Error fetching category:", err)
          setError("Failed to load category details")
        }

        setLoading(false)
      } catch (err) {
        console.error("Error parsing results data:", err)
        router.push(`/reviewer/${category}`)
      }
    }

    getResults()

    // Clean up function that aborts fetch requests when component unmounts
    return () => {
      controller.abort()
    }
  }, [category, router, searchParams])

  if (loading) {
    return (
      <div className="container max-w-3xl mx-auto py-12 px-4 text-center">
        <p>Loading results...</p>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="container max-w-3xl mx-auto py-12 px-4 text-center">
        <p>{error || "Failed to load results"}</p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  // Handle singular/plural forms
  const correctAnswerText = results.score === 1 
    ? "1 correct answer" 
    : `${results.score} correct answers`;
  
  const questionText = results.total === 1 
    ? "1 question" 
    : `${results.total} questions`;

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Your Results</h1>
        <p className="text-muted-foreground">
          {categoryTitle} Reviewer Summary
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>
            You scored {results.score} out of {results.total} {results.total === 1 ? "question" : "questions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-5xl font-bold">
                {Math.round((results.score / results.total) * 100)}%
              </div>
              <p className="text-muted-foreground mt-2">
                {correctAnswerText} out of {questionText}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/reviewer/${category}`}>
            <Button variant="outline">Try Again</Button>
          </Link>
          <Link href="/">
            <Button>Back to Categories</Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Question Review</h2>
        <p className="text-muted-foreground">
          Review all questions and their correct answers
        </p>
      </div>

      <div className="space-y-6">
        {results.questions.map((question, idx) => (
          <Card key={question.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">
                Question {idx + 1}: {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {question.options.map((opt) => {
                  const isCorrect = opt.id === question.correctAnswer;
                  const isChosen = opt.id === question.userAnswer;
                  
                  // Style similar to the quiz page
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
                          <div className="h-5 w-5"></div> // Empty space for alignment
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
                        {opt.text}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Explanation section with improved styling */}
              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p className="text-foreground">{question.explanation}</p>
              </div>
              
              {/* Source section with separator */}
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
  )
}