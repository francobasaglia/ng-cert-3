import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { QuizMakerCategory, QuizQuestion, QuizResults } from '../models/quiz.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private latestResults: QuizResults | undefined;

  constructor(private apiService: ApiService) { }

  public getAllCategories(): Observable<QuizMakerCategory[]> {
    return this.apiService.getCategories().pipe(
      map(response => response.trivia_categories)
    );
  }

  public createQuiz(categoryId: string, difficultyId: string): Observable<QuizQuestion[]> {
    return this.apiService.getQuestions(categoryId, difficultyId).pipe(
        map(res => {
          const quiz: QuizQuestion[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  public computeScore(questions: QuizQuestion[], answers: string[]): void {
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
