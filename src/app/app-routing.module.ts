import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent, AnswersComponent } from './pages';
import { QuizService } from './services';

const routes: Routes = [
  {
    path: 'quiz-maker',
    component: QuizMakerComponent
  },
  {
    path: 'result',
    component: AnswersComponent,
    resolve: {
      data: () => inject(QuizService).getLatestResults()
    }
  },
  {
    path: '**',
    redirectTo: 'quiz-maker'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { bindToComponentInputs: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
