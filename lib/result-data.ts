// lib/result-data.ts
import { cache } from "react";
import { get } from "@/lib/db";
import { getQuestionById } from "@/lib/data";
import type { Question } from "@/lib/types";

// Define the expected structure of result data from Redis
interface ResultData {
  categoryId: string;
  score: number;
  total: number;
  answers: ResultAnswer[];
}

// Define the structure of an answer in the Redis data
interface ResultAnswer {
  questionId: string;
  userAnswer: string | null;
  timeSpent: number;
}

// Type for Question with user answer and time information
export type QuestionWithUserData = Question & {
  userAnswer: string | null;
  timeSpent: number;
};

// Helper function to parse Redis data safely
function parseRedisData(data: unknown): ResultData | null {
  if (!data) return null;

  try {
    if (typeof data === "object") return data as ResultData;
    return JSON.parse(data as string) as ResultData;
  } catch (error) {
    console.error("Error parsing Redis data:", error);
    return null;
  }
}

// Check if a result exists without fetching all data
export const checkResultExists = cache(async (resultId: string) => {
  const resultData = await get(`results:${resultId}`);
  return resultData !== null;
});

// Get just the summary data for the results page
export const getResultSummary = cache(async (resultId: string) => {
  const resultData = await get(`results:${resultId}`);
  const parsedData = parseRedisData(resultData);

  if (!parsedData) return null;

  return {
    score: parsedData.score,
    total: parsedData.total,
    categoryId: parsedData.categoryId,
  };
});

// Get data needed for performance insights
export const getInsightsData = cache(async (resultId: string) => {
  const resultData = await get(`results:${resultId}`);
  const parsedData = parseRedisData(resultData);

  if (!parsedData) return null;

  // Fetch full question data for each answer
  const questionPromises = parsedData.answers.map(
    async (answer: ResultAnswer) => {
      const question = await getQuestionById(answer.questionId);
      if (!question) return null;

      return {
        ...question,
        userAnswer: answer.userAnswer,
        timeSpent: answer.timeSpent,
      } as QuestionWithUserData;
    },
  );

  const questions = await Promise.all(questionPromises);
  return questions.filter(Boolean) as QuestionWithUserData[]; // Remove any null values
});

// Get detailed question results with full question data
export const getQuestionResults = cache(async (resultId: string) => {
  const resultData = await get(`results:${resultId}`);
  const parsedData = parseRedisData(resultData);

  if (!parsedData) return null;

  // Fetch full question data for each answer (in parallel)
  const questionPromises = parsedData.answers.map(
    async (answer: ResultAnswer) => {
      const question = await getQuestionById(answer.questionId);
      if (!question) return null;

      return {
        ...question,
        userAnswer: answer.userAnswer,
        timeSpent: answer.timeSpent,
      } as QuestionWithUserData;
    },
  );

  const questions = await Promise.all(questionPromises);
  return questions.filter(Boolean) as QuestionWithUserData[]; // Remove any null values
});
