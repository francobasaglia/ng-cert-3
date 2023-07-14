import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input({required: true})
  public question!: QuizQuestion;
  
  @Input()
  public correctAnswer?: string;
  
  @Input()
  public userAnswer?: string;

  @Input()
  public canChangeQuestion: boolean = false;

  @Output()
  public readonly change = new EventEmitter<string>();

  @Output()
  public readonly changeQuestion = new EventEmitter<void>();

  public currentSelection: string = '';

  public questionSelected(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(this.currentSelection);
  }

  public questionChange(): void {
    this.changeQuestion.emit();
  }
}
