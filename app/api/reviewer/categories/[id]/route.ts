import { type NextRequest, NextResponse } from "next/server"
import { categories } from "@/data/reviewer-data"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: categoryId } = await params

  const category = categories.find((cat) => cat.id === categoryId)
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 })
  }

  return NextResponse.json(category)
}
