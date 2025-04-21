export interface Category {
  id: string;
  title: string;
  description: string;
  questionCount: number;
}

export interface Option {
  id: string;
  text: string;
}

export interface Source {
  name: string;
  url: string;
}

export interface Question {
  id: string;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
  source?: Source;
  userAnswer?: string | null;
  categoryId?: string;
}

export interface AnswerWithTime {
  questionId: string;
  userAnswer: string | null;
  timeSpent: number; // Time in seconds
}
