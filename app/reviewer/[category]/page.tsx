import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ReviewerContent } from "@/components/reviewer-content"
import { headers } from "next/headers"

interface ReviewerPageProps {
  params: { category: string }
}

// Helper to build the base URL at request time
export async function getBaseUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }
  const headersList = await headers()
  const host = headersList.get("host") ?? "localhost:3000"
  const protocol = host.includes("localhost") ? "http://" : "https://"
  return `${protocol}${host}`
}

// Generate page metadata based on the category
export async function generateMetadata({
  params,
}: ReviewerPageProps): Promise<Metadata> {
  const { category: categoryId } = await params
  const baseUrl = await getBaseUrl()

  try {
    const response = await fetch(
      `${baseUrl}/api/reviewer/categories/${categoryId}`,
      { headers: { "Content-Type": "application/json" } }
    )
    if (!response.ok) {
      return {
        title: "NQESH Reviewer",
        description: "Professional reviewer for aspiring school heads",
      }
    }
    const category = await response.json()

    return {
      title: `${category.title} | NQESH Reviewer`,
      description: `Review questions about ${category.title.toLowerCase()} for the National Qualifying Examination for School Heads`,
    }
  } catch (error) {
    console.error("Error fetching category metadata:", error)
    return {
      title: "NQESH Reviewer",
      description: "Professional reviewer for aspiring school heads",
    }
  }
}

// The page component itself
export default async function ReviewerPage({
  params,
}: ReviewerPageProps) {
  const { category: categoryId } = await params
  const baseUrl = await getBaseUrl()

  try {
    const categoryResponse = await fetch(
      `${baseUrl}/api/reviewer/categories/${categoryId}`,
      { headers: { "Content-Type": "application/json" } }
    )
    if (!categoryResponse.ok) notFound()
    const category = await categoryResponse.json()

    return (
      <div className="container max-w-3xl mx-auto py-6 px-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{category.title} Reviewer</h1>
          <p className="text-muted-foreground">
            Answer the following questions to test your knowledge
          </p>
        </div>

        <div className="mt-6">
          <ReviewerContent categoryId={categoryId} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in ReviewerPage:", error)
    notFound()
  }
}
