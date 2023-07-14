import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFilterComponent } from './auto-filter/auto-filter.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';
import { PipesModule } from '../pipes';

const COMPONENTS: Type<any>[] = [
  AutoFilterComponent,
  QuestionComponent,
  QuizComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }

export * from './auto-filter/auto-filter.component';
export * from './question/question.component';
export * from './quiz/quiz.component';
