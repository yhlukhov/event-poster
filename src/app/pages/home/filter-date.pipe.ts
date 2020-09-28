import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(collection: Array<IEvent>): unknown {
    return collection?.filter(event => event.startDate.getTime() + 2*60*60*1000 >= (new Date()).getTime())
  }
}
