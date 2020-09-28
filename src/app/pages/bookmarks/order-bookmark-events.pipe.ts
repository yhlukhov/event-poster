import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from '../../shared/interfaces/event.interface';

@Pipe({
  name: 'orderBookmarkEvents'
})
export class OrderBookmarkEventsPipe implements PipeTransform {

  transform(bookmarks: Array<IEvent>):Array<IEvent> {
    return bookmarks?.sort((a: IEvent, b: IEvent) => {
      if (a.startDate > b.startDate) return 1
      else if (a.startDate < b.startDate) return -1
      else return 0
    })
  }
}
