import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
  public transform<T = any>(list: T[], filterBy: keyof T, search: string = ''): T[] {
    if (!Array.isArray(list)) {
      return [];
    }

    search = search.trim();
    
    if (!search) {
      return list;
    }

    return list.filter(listItem => (listItem[filterBy] as string)?.trim().toLowerCase().includes(search.toLowerCase()));
  }
}
