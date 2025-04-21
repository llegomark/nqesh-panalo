// app/reviewer/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewerContent } from "@/components/reviewer-content";
import { getCategory, getCategoryQuestions } from "@/lib/data"; // Use direct data access
import { shuffleArray } from "@/lib/utils";
import type { Question } from '@/lib/types'; // Ensure Question type is imported
import { Toaster } from "sonner";
import { CopyProtection } from "@/components/copy-protection";

interface ReviewerPageProps {
  params: Promise<{ category: string }>; // Params are async in v15 Server Components
}

// Generate page metadata based on the category using direct data access
export async function generateMetadata({
  params,
}: ReviewerPageProps): Promise<Metadata> {
  // Await params here
  const { category: categoryId } = await params;
  const category = getCategory(categoryId); // Direct data access

  if (!category) {
    return {
      title: "NQESH Reviewer",
      description: "Reviewer category not found.",
    };
  }

  return {
    title: `${category.title} | NQESH Reviewer`,
    description: `Review questions about ${category.title.toLowerCase()} for the National Qualifying Examination for School Heads`,
  };
}

// The page component itself
export default async function ReviewerPage({ params }: ReviewerPageProps) {
   // Await params here
  const { category: categoryId } = await params;

  // Fetch category details directly
  const category = getCategory(categoryId);
  if (!category) {
    notFound(); // Trigger 404 if category doesn't exist
  }

  // Fetch questions directly
  const allCategoryQuestions = getCategoryQuestions(categoryId);

  // Handle case where category exists but has no questions
  if (allCategoryQuestions.length === 0) {
     notFound(); // Or render a message component
  }

  // Shuffle questions and their options here on the server
  const shuffledQuestions: Question[] = shuffleArray([...allCategoryQuestions]).map(
    (question) => ({
      ...question,
      options: shuffleArray([...question.options]),
      userAnswer: null, // Initialize userAnswer
    })
  );

  return (
    <div className="container max-w-3xl mx-auto py-6 px-4">
      {/* Add Toaster component for notifications */}
      <Toaster position="bottom-right" />
      
      {/* Add Copy Protection component */}
      <CopyProtection />
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{category.title} Reviewer</h1>
        {/* Optional: Add description or other category info here */}
      </div>

      <div className="mt-6">
        {/* Pass shuffled questions as props to the Client Component */}
        <ReviewerContent
          categoryId={categoryId}
          initialQuestions={shuffledQuestions}
        />
      </div>
    </div>
  );
}