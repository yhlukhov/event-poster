import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from '../../shared/interfaces/event.interface';

@Pipe({
  name: 'filterLanguages'
})
export class FilterLanguagesPipe implements PipeTransform {

  transform(collection: Array<IEvent>, languageFilter: Array<string>): unknown {
    if(languageFilter.length > 0) {
      return collection?.filter(event => languageFilter.includes(event.channel.language.code))
    }
    else return collection
  }

}
