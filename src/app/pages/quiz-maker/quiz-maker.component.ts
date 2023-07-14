import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { QuizQuestion, QuizAnswers, QuizMakerOptions, FormOption } from '../../models';
import { QuizService } from '../../services';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {
  public form!: FormGroup;
  public subcategories: FormOption[] = [];
  public options!: QuizMakerOptions;
  public questions: QuizQuestion[] | undefined;
  public canChangeQuestion: boolean = true;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {
    this.quizService.getQuizMakerOptions().subscribe(response => this.options = response);
    this.form = this.getFormGroup();

    this.form.get('categoryLabel')!.valueChanges.pipe(takeUntilDestroyed()).subscribe(categoryLabel => {
      const category = this.options.categories.find(category => category.label === categoryLabel)!;

      if (!category) return;

      this.subcategories = category.subcategories ?? [];

      if (this.subcategories.length) {
        this.form.get('categoryId')!.setValue(null);
      } else {
        this.form.get('categoryId')!.setValue(category.id);
      }
    });
  }

  public createQuiz(): void {
    const { value, valid } = this.form;

    if (valid) {
      this.canChangeQuestion = true;
      this.quizService.createQuiz(value.categoryId, value.difficulty).subscribe(response => this.questions = response);
    }
  }

  public onChangeQuestion(index: number): void {
    const { value } = this.form;

    this.canChangeQuestion = false;
    this.quizService.updateQuiz(value.categoryId, value.difficulty, this.questions!, index).subscribe(response => this.questions = response)
  }

  public onSubmit(result: QuizAnswers): void {
    this.quizService.computeScore(result.questions, result.answers);
    this.router.navigateByUrl('/results');
  }

  private getFormGroup(): FormGroup {
    return new FormGroup({
      categoryLabel: new FormControl<string | null>(null),
      categoryId: new FormControl<string | null>(null, [Validators.required]),
      difficulty: new FormControl<string | null>(null, [Validators.required])
    });
  }
}
