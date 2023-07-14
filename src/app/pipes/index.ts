import { NgModule, Type } from '@angular/core';
import { HighlightPipe } from './highlight.pipe';

const PIPES: Type<any>[] = [
  HighlightPipe
]

@NgModule({
  declarations: [
    ...PIPES
  ],
  exports: [
    ...PIPES
  ],
  providers: [
    ...PIPES
  ],
})
export class PipesModule { }

export * from './highlight.pipe';
