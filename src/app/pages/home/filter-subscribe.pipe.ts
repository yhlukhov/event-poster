import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Pipe({
  name: 'filterSubscribe'
})
export class FilterSubscribePipe implements PipeTransform {

  transform(collection: Array<IEvent>, unsubscribeFilter: Array<string>): unknown {
    if(unsubscribeFilter.length > 0) {
      return collection?.filter(event => !unsubscribeFilter.includes(event.channel.id))
    }
    else return collection
  }
}
