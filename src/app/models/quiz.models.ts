import { FormOption } from './form.models';

export interface QuizMakerOptions {
  categories: QuizMakerCategory[];
  difficulties: FormOption[];
}

export interface QuizMakerCategory extends FormOption {
  subcategories: FormOption[];
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
