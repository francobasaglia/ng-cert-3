import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizMakerCategory, QuizQuestion, QuizAnswers } from '../../models';
import { QuizService } from '../../services';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {
  public categories$: Observable<QuizMakerCategory[]>;
  public questions$!: Observable<QuizQuestion[]>;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {
    this.categories$ = quizService.getAllCategories()
  }

  public createQuiz(cat: string, difficulty: string): void {
    this.questions$ = this.quizService.createQuiz(cat, difficulty.toLowerCase());
  }

  public onSubmit(result: QuizAnswers): void {
    this.quizService.computeScore(result.questions, result.answers);
    this.router.navigateByUrl('/results');
  }
}
