// lib/data.ts
import "server-only"; // Ensures this module only runs on the server
import { categories, questions } from "@/data/reviewer-data";
import type { Category, Question } from "@/lib/types";
// Removed unused notFound import

/**
 * Fetches all categories.
 */
export function getAllCategories(): Category[] {
  return categories;
}

/**
 * Fetches a single category by its ID.
 * @param categoryId - The ID of the category to fetch.
 */
export function getCategory(categoryId: string): Category | undefined {
  const category = categories.find((cat) => cat.id === categoryId);
  return category;
}

/**
 * Fetches all questions for a specific category.
 * @param categoryId - The ID of the category for which to fetch questions.
 */
export function getCategoryQuestions(categoryId: string): Question[] {
  const categoryQuestions = questions.filter(
    (question) => question.categoryId === categoryId,
  );
  return categoryQuestions;
}

/**
 * Fetches a specific question by its ID.
 * @param questionId - The ID of the question to fetch.
 */
export function getQuestionById(questionId: string): Question | undefined {
  const question = questions.find((q) => q.id === questionId);
  return question;
}
