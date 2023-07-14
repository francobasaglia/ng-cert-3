import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { QuizMakerOptions, QuizQuestion, QuizResults, DifficultyResponse, CategoryResponse, FormOption, QuizMakerCategory } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private latestResults: QuizResults | undefined;

  constructor(private apiService: ApiService) { }

  public getQuizMakerOptions(): Observable<QuizMakerOptions> {
    return forkJoin([
      this.apiService.getCategories().pipe(
        map(response => response.trivia_categories)
      ),
      this.apiService.getDifficulties().pipe(
        map(response => response.trivia_difficulties)
      )
    ]).pipe(
      map<[CategoryResponse[], DifficultyResponse[]], QuizMakerOptions>(([ categories, difficulties ]) => {
        return {
          categories: this.getCategories(categories),
          difficulties: this.getDifficulties(difficulties)
        };
      })
    )
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

  private getCategories(categories: CategoryResponse[]): QuizMakerCategory[] {
    const quizMakerCategories: QuizMakerCategory[] = [];

    categories.forEach(category => {
      const [ categoryName, subcategoryName ] = category.name.split(':').map(value => value.trim());
      const categoryIndex = quizMakerCategories.findIndex(quizMakerCategory => quizMakerCategory.label === categoryName);

      if (categoryIndex === -1) {
        quizMakerCategories.push({
          id: !subcategoryName ? category.id : '',
          label: categoryName,
          disabled: false,
          subcategories: !subcategoryName ? [] : [ this.getSubcategories(category.id, subcategoryName) ]
        });
      } else {
        quizMakerCategories[categoryIndex].subcategories.push(
          this.getSubcategories(category.id, subcategoryName)
        );
      }
    });

    return quizMakerCategories;
  }

  private getSubcategories(id: string, label: string): FormOption {
    return {
      id: id,
      label: label,
      disabled: false
    };
  }

  private getDifficulties(difficulties: DifficultyResponse[]): FormOption[] {
    return difficulties.map(difficulty => ({
      id: difficulty.id, 
      label: difficulty.name, 
      disabled: false
    }));
  }
}
