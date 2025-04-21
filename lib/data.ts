// FILE: lib/data.ts
import "server-only"; // Ensures this module only runs on the server
import { cache } from "react"; // Import React's cache function
import { categories, questions } from "@/data/reviewer-data";
import type { Category, Question } from "@/lib/types";

/**
 * Fetches all categories.
 * Wrapped with React cache to memoize the result within a request.
 */
export const getAllCategories: () => Category[] = cache(() => {
  console.log(
    "Executing getAllCategories (will run once per request if called multiple times)",
  );
  return categories;
});

/**
 * Fetches a single category by its ID.
 * Wrapped with React cache to memoize the result within a request for the same ID.
 * @param categoryId - The ID of the category to fetch.
 */
export const getCategory: (categoryId: string) => Category | undefined = cache(
  (categoryId: string) => {
    console.log(
      `Executing getCategory for ID: ${categoryId} (will run once per ID per request)`,
    );
    const category = categories.find((cat) => cat.id === categoryId);
    return category;
  },
);

/**
 * Fetches all questions for a specific category.
 * Wrapped with React cache to memoize the result within a request for the same category ID.
 * @param categoryId - The ID of the category for which to fetch questions.
 */
export const getCategoryQuestions: (categoryId: string) => Question[] = cache(
  (categoryId: string) => {
    console.log(
      `Executing getCategoryQuestions for ID: ${categoryId} (will run once per ID per request)`,
    );
    const categoryQuestions = questions.filter(
      (question) => question.categoryId === categoryId,
    );
    return categoryQuestions;
  },
);

/**
 * Fetches a specific question by its ID.
 * Wrapped with React cache to memoize the result within a request for the same question ID.
 * @param questionId - The ID of the question to fetch.
 */
export const getQuestionById: (questionId: string) => Question | undefined =
  cache((questionId: string) => {
    console.log(
      `Executing getQuestionById for ID: ${questionId} (will run once per ID per request)`,
    );
    const question = questions.find((q) => q.id === questionId);
    return question;
  });
