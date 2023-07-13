export interface CategoriesResponse {
    trivia_categories: CategoryResponse[];
}

export interface CategoryResponse {
    id: number;
    name: string;
}

export interface DifficultiesResponse {
    difficulties_categories: DifficultyResponse[];
}

export interface DifficultyResponse {
    id: string;
    name: string;
}

export interface QuestionsResponse {
    response_code: number | unknown;
    results: QuestionResponse[];
}

export interface QuestionResponse {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}
