import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../shared/services/channel.service';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { ICountry } from '../../shared/interfaces/country.interface';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channels: IChannel[]

  constructor(private channelService: ChannelService) { }

  ngOnInit(): void {
    this.loadChannels()
    this.loadChannel("ZWDrLDv8DBh77xXvixbwFyMNW9n1")
  }

  loadChannels() {
    this.channelService.getAllChannels().subscribe(channels => {
      this.channels = channels.docs.map(doc => {
        return doc.data() as IChannel
      })
    })
  }

  loadChannel(id:string) {
    // this.channelService.getChannel(id).snapshotChanges().subscribe(data => {
    //   console.log(data.payload.data())
    // })
  }

}
