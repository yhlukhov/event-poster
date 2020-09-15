import { Pipe, PipeTransform } from '@angular/core';
import { IChannel } from '../../shared/interfaces/channel.interface';

@Pipe({
  name: 'filterChannelLanguages'
})
export class FilterChannelLanguagesPipe implements PipeTransform {

  transform(channels: IChannel[], languageFilter: Array<string>): unknown {
    if(languageFilter.length > 0) {
      return channels.filter(channel => languageFilter.includes(channel.language.code))
    }
    else return channels
  }

}
