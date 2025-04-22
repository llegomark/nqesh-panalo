import { getQuestionResults } from "@/lib/result-data";
import { VirtualizedQuestionList } from "@/components/virtualized-question-list";

export async function QuestionList({ resultId }: { resultId: string }) {
  // Fetch question results - this will trigger suspense
  const questions = await getQuestionResults(resultId);

  if (!questions || questions.length === 0) {
    return <div>No questions found.</div>;
  }

  // Return client component with the data
  return <VirtualizedQuestionList questions={questions} pageSize={10} />;
}
