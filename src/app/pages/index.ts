import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components';
import { AnswersComponent } from './answers/answers.component';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';

@NgModule({
  declarations: [
    AnswersComponent,
    QuizMakerComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }

export * from './answers/answers.component';
export * from './quiz-maker/quiz-maker.component';
 