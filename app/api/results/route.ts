// app/api/results/route.ts
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { put } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { categoryId, score, total, answers } = await request.json();

    // Validate the required fields
    if (!categoryId || score === undefined || !total || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Generate a unique ID for this result
    const id = uuidv4();

    // Store the results in Redis with a 1-hour TTL (3600 seconds)
    await put(
      `results:${id}`,
      JSON.stringify({
        categoryId,
        score,
        total,
        answers,
      }),
      { ttl: 3600 },
    );

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error storing results:", error);
    return NextResponse.json(
      { error: "Failed to store results" },
      { status: 500 },
    );
  }
}
