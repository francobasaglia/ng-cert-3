import { Component, Input } from '@angular/core';
import { QuizResults } from '../../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input()
  public results: QuizResults | undefined;
}
