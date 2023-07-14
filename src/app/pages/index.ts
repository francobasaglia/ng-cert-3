import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    QuizMakerComponent,
    ResultsComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }

export * from './quiz-maker/quiz-maker.component';
export * from './results/results.component';
 