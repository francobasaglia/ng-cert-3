import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';

const COMPONENTS: Type<any>[] = [
  QuestionComponent,
  QuizComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }

export * from './question/question.component';
export * from './quiz/quiz.component';
