import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent, ResultsComponent } from './pages';
import { QuizService } from './services';

const routes: Routes = [
  {
    path: 'quiz-maker',
    component: QuizMakerComponent
  },
  {
    path: 'results',
    component: ResultsComponent,
    resolve: {
      results: () => inject(QuizService).getLatestResults()
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
