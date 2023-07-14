import { NgModule, Type } from '@angular/core';
import { HighlightPipe } from './highlight.pipe';
import { ListFilterPipe } from './list-filter.pipe';

const PIPES: Type<any>[] = [
  HighlightPipe,
  ListFilterPipe
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
export * from './list-filter.pipe';
