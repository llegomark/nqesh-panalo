"use server";

import { v4 as uuidv4 } from "uuid";
import { put } from "@/lib/db";

interface ReportQuestionArgs {
  questionId: string;
  categoryId: string;
  questionText: string;
  message: string;
  timestamp: number;
}

interface ReportQuestionReturn {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Server Action to save question reports to Redis.
 * This stores reports without a TTL so they don't expire.
 */
export async function reportQuestion(
  args: ReportQuestionArgs,
): Promise<ReportQuestionReturn> {
  const { questionId, categoryId, questionText, message, timestamp } = args;

  // Validate the required fields
  if (!questionId || !categoryId || !message) {
    console.error("Validation Error: Missing required fields", args);
    return { success: false, error: "Missing required fields" };
  }

  try {
    // Generate a unique ID for this report
    const id = uuidv4();

    // Prepare the data to be stored
    const reportData = {
      id,
      questionId,
      categoryId,
      questionText,
      message,
      timestamp,
      status: "pending", // For future report management
      reviewed: false,
    };

    // Store the report in Redis with no TTL so it doesn't expire
    await put(`report:${id}`, reportData);

    console.log(`Report saved successfully with ID: ${id}`);
    return { success: true, id };
  } catch (error) {
    console.error("Error saving report:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: `Failed to save report: ${errorMessage}` };
  }
}
