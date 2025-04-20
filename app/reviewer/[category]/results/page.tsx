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

  // track mounting to avoid setting state on unmounted
  const [isMounted, setIsMounted] = useState(true)
  useEffect(() => {
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    const resultsData = searchParams.get("data")
    if (!resultsData) {
      router.push(`/reviewer/${category}`)
      return
    }

    const getResults = async () => {
      try {
        // decode the quiz results from the URL
        const decodedData = JSON.parse(atob(resultsData))
        if (isMounted) {
          setResults(decodedData)
        }

        // fetch category details for the title
        try {
          const protocol = window.location.protocol
          const host = window.location.host
          const baseUrl = `${protocol}//${host}`

          const response = await fetch(
            `${baseUrl}/api/reviewer/categories/${category}`
          )

          if (response.ok) {
            const data = await response.json()
            if (isMounted) {
              setCategoryTitle(data.title)
            }
          }
        } catch (err) {
          console.error("Error fetching category:", err)
          if (isMounted) {
            setError("Failed to load category details")
          }
        }

        if (isMounted) {
          setLoading(false)
        }
      } catch (err) {
        console.error("Error parsing results data:", err)
        if (isMounted) {
          router.push(`/reviewer/${category}`)
        }
      }
    }

    getResults()
  }, [category, router, searchParams, isMounted])

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
            You scored {results.score} out of {results.total} questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-5xl font-bold">
                {Math.round((results.score / results.total) * 100)}%
              </div>
              <p className="text-muted-foreground mt-2">
                {results.score} correct answers out of {results.total} questions
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
          <Card key={question.id}>
            <CardHeader>
              <CardTitle>
                Question {idx + 1}: {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {question.options.map((opt) => {
                const isCorrect = opt.id === question.correctAnswer
                const isChosen = opt.id === question.userAnswer
                return (
                  <div
                    key={opt.id}
                    className="flex items-center gap-2 mb-2"
                  >
                    {isCorrect ? (
                      <Check className="text-green-500" />
                    ) : isChosen ? (
                      <X className="text-red-500" />
                    ) : null}
                    <span
                      className={
                        isCorrect
                          ? "font-semibold text-green-600"
                          : isChosen
                          ? "font-semibold text-red-600"
                          : ""
                      }
                    >
                      {opt.text}
                    </span>
                  </div>
                )
              })}
              <div className="mt-4">
                <p className="font-medium">Explanation:</p>
                <p>{question.explanation}</p>
              </div>
              {question.source && (
                <div className="pt-2 border-t">
                  <p className="font-medium">Source:</p>
                  <div className="flex items-center gap-2">
                    <span>{question.source.name}</span>
                    {question.source.url && (
                      <a
                        href={question.source.url}
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
