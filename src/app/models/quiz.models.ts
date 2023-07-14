export interface QuizMakerOptions {
  categories: QuizMakerCategory[];
  difficulties: QuizMakerDifficulty[];
}

export interface QuizMakerCategory {
  id: number;
  name: string;
}

export interface QuizMakerDifficulty {
  id: string;
  name: string;
}

export interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

export interface QuizAnswers {
  answers: string[];
  questions: QuizQuestion[];
}

export interface QuizResults {
  questions: QuizQuestion[];
  answers: string[];
  score: number;
}
