import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from '../../shared/interfaces/event.interface';

@Pipe({
  name: 'orderEvents'
})
export class OrderEventsPipe implements PipeTransform {

  transform(collection: Array<IEvent>):Array<IEvent> {
    return collection?.sort((a: IEvent, b: IEvent) => {
      if (a.startDate > b.startDate) return 1
      else if (a.startDate < b.startDate) return -1
      else return 0
    })
  }

}