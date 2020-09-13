import { Pipe, PipeTransform } from '@angular/core';
import { ILanguage } from 'src/app/shared/interfaces/language.interface';
import { IEvent } from '../../shared/interfaces/event.interface';

@Pipe({
  name: 'filterLanguages'
})
export class FilterLanguagesPipe implements PipeTransform {

  transform(collection: Array<IEvent>, languageFilter: Array<ILanguage>): unknown {
    if(languageFilter.length > 0) {
      console.log(">0")
      return collection.filter(event => languageFilter.some(lang => lang.code === event.channel.language.code))
    }
    else return collection
  }

}
