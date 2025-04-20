import { type NextRequest, NextResponse } from "next/server"
import { questions } from "@/data/reviewer-data"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: categoryId } = await params

  const categoryQuestions = questions.filter(
    (question) => question.categoryId === categoryId
  )
  if (categoryQuestions.length === 0) {
    return NextResponse.json(
      { error: "No questions found for this category" },
      { status: 404 }
    )
  }

  return NextResponse.json(categoryQuestions)
}
