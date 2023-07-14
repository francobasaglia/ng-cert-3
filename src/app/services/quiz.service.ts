import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category, Difficulty, Question, QuizResults } from '../models/quiz.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private latestResults: QuizResults | undefined;

  constructor(private apiService: ApiService) { }

  public getAllCategories(): Observable<Category[]> {
    return this.apiService.getCategories().pipe(
      map(res => res.trivia_categories)
    );
  }

  public createQuiz(categoryId: string, difficultyId: string): Observable<Question[]> {
    return this.apiService.getQuestions(categoryId, difficultyId).pipe(
        map(res => {
          const quiz: Question[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  public computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index])
        score++;
    })
    this.latestResults = {questions, answers, score};
  }

  public getLatestResults(): QuizResults | undefined {
    return this.latestResults;
  }
}
