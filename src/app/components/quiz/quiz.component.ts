import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion, QuizAnswers } from '../../models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input()
  public questions: QuizQuestion[] | null = [];

  @Input()
  public canChangeQuestion: boolean = false;

  @Output()
  public readonly changeQuestion = new EventEmitter<number>();

  @Output()
  public readonly submit = new EventEmitter<QuizAnswers>();

  public answers: string[] = [];

  public onAnswerChange(choice: string, index: number): void {
    this.answers[index] = choice;
  }

  public onChangeQuestion(index: number): void {
    this.changeQuestion.emit(index);
  }

  public onSubmit(): void {
    this.submit.emit({ 
      answers: this.answers,
      questions: this.questions ?? []
    });
  }
}
