import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  public transform(source: string, search: string): string {
    if (!search) {
      return source;
    }

    if (source) {
      return source.replace(new RegExp(search, 'gi'), '<mark>$&</mark>');
    }

    return '';
  }
}
