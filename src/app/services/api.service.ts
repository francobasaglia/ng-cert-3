import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CategoriesResponse, DifficultiesResponse, QuestionResponse, QuestionsResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://opentdb.com';

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${this.API_URL}/api_category.php`);
  }

  public getDifficulties(): Observable<DifficultiesResponse> {
    /**
     * @TODO
     * Replace this mocked implementation by a API request.
     */
    return of<DifficultiesResponse>({
      difficulties_categories: [
        {
          id: 'easy',
          name: 'Easy'
        },
        {
          id: 'medium',
          name: 'Medium'
        },
        {
          id: 'hard',
          name: 'Hard'
        }
      ]
    });
  }

  public getQuestions(categoryId: string, difficultyId: string, amount: number = 5): Observable<QuestionsResponse> {
    const queryParams = {
      amount,
      category: categoryId,
      difficulty: difficultyId,
      type: 'multiple'
    };

    return this.http.get<QuestionsResponse>(`${this.API_URL}/api.php`, {
      params: queryParams
    });
  }

  public getQuestion(categoryId: string, difficultyId: string): Observable<QuestionResponse> {
    return this.getQuestions(categoryId, difficultyId, 1).pipe(
      map(response => response.results[0])
    );
  }
}
