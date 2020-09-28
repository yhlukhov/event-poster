import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from '../../shared/interfaces/event.interface';

@Pipe({
  name: 'filterBookmarkDate'
})
export class FilterBookmarkDatePipe implements PipeTransform {

  transform(bookmarks: Array<IEvent>): unknown {
    return bookmarks?.filter(event => event.startDate.getTime() + 2*60*60*1000 >= (new Date()).getTime())
  }

}
