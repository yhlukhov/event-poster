import { Pipe, PipeTransform } from '@angular/core';
import { IChannel } from '../../shared/interfaces/channel.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(channels:Array<IChannel>, filterPattern: string): unknown {
    if (filterPattern != "")
      return channels.filter(channel =>
        channel.name.toLowerCase().includes(filterPattern.toLowerCase())
        || channel.userName.toLowerCase().includes(filterPattern.toLowerCase())
        || channel.userEmail.toLowerCase().includes(filterPattern.toLowerCase())
        )
    else return channels
  }
}
