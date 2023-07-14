import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question, QuizAnswers } from '../../models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input()
  public questions: Question[] | null = [];

  @Output()
  public readonly submit = new EventEmitter<QuizAnswers>();

  public answers: string[] = [];

  public onAnswerChange(choice: string, index: number): void {
    this.answers[index] = choice;
  }

  public onSubmit(): void {
    this.submit.emit({ 
      answers: this.answers,
      questions: this.questions ?? []
    });
  }
}
