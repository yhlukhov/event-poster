import { Pipe, PipeTransform } from '@angular/core';
import { IChannel } from '../../shared/interfaces/channel.interface';

@Pipe({
  name: 'filterChannelCountries'
})
export class FilterChannelCountriesPipe implements PipeTransform {

  transform(channels: IChannel[], countryFilter: Array<string>): unknown {
    if(countryFilter.length > 0) {
      return channels.filter(channel => countryFilter.includes(channel.country.code))
    }
    else return channels
  }

}
