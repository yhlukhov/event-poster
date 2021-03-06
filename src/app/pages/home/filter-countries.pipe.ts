import { Pipe, PipeTransform } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { ICountry } from 'src/app/shared/interfaces/country.interface';

@Pipe({
  name: 'filterCountries'
})
export class FilterCountriesPipe implements PipeTransform {

  transform(collection: Array<IEvent>, countryFilter: Array<string>): unknown {
    if (countryFilter.length > 0) {
      return collection?.filter(event => countryFilter.includes(event.channel.country.code))
    }
    else return collection
  }

}
