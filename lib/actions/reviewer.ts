// FILE: lib/actions/reviewer.ts
"use server";

import { v4 as uuidv4 } from "uuid";
import { put } from "@/lib/db";
import type { AnswerWithTime } from "@/lib/types"; // Assuming AnswerWithTime is defined here

interface SaveResultsArgs {
  categoryId: string;
  score: number;
  total: number;
  answers: AnswerWithTime[];
}

interface SaveResultsReturn {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Server Action to save review results to Redis.
 * @param args - The results data including categoryId, score, total, and answers.
 * @returns An object indicating success status and the generated ID, or an error message.
 */
export async function saveReviewResults(
  args: SaveResultsArgs,
): Promise<SaveResultsReturn> {
  const { categoryId, score, total, answers } = args;

  // Validate the required fields
  if (!categoryId || score === undefined || !total || !answers) {
    console.error("Validation Error: Missing required fields", args);
    return { success: false, error: "Missing required fields" };
  }

  try {
    // Generate a unique ID for this result
    const id = uuidv4();

    // Prepare the data to be stored
    const resultData = {
      categoryId,
      score,
      total,
      answers, // Assuming answers includes questionId, userAnswer, and timeSpent
    };

    // Store the results in Redis with a 1-hour TTL (3600 seconds)
    await put(`results:${id}`, resultData, { ttl: 3600 });

    console.log(`Results saved successfully with ID: ${id}`);
    return { success: true, id };
  } catch (error) {
    console.error("Error saving results:", error);
    // Check if error is an instance of Error to access message property safely
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: `Failed to save results: ${errorMessage}` };
  }
}
