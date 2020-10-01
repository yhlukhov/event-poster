import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../shared/services/channel.service';
import { EventService } from '../../shared/services/event.service';
import { IChannel } from 'src/app/shared/interfaces/channel.interface';
import { Channel } from '../../shared/models/channel.model';
import { from } from 'rxjs';
import { IEvent } from 'src/app/shared/interfaces/event.interface';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  channels: Array<IChannel> = []


  constructor(private channelService: ChannelService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadChannels()
  }

  loadChannels() {
    this.channels = []
    this.channelService.getAllChannels().subscribe((channels) => {
      channels.forEach(channel => {
        const data = channel.data()
        const { name, userName, userEmail, userPassword, country, language, description, image, userRole, subscribe, id } = data
        this.channels.push(new Channel(name, userName, userEmail, userPassword, country, language, description, image, userRole, subscribe, id))
      })
    })
  }

  delete(channel: IChannel) {
    if (confirm("Вы уверенны что хотите удалить канал? Все события канала будуть так же удалены!")) {
      this.eventService.getChannelEvents(channel).get().then(event => {
        event.forEach(record => {
          const data = record.data() as IEvent
          const id = record.id
          const event = {...data, id}
          this.deleteEvent(event)
        })
      })
      this.channelService.deleteChannel(channel).then(() => {
        this.loadChannels()
      })
    }
  }

  deleteEvent(event: IEvent) {
    this.eventService.deleteEvent(event)
  }

  filter(event: InputEvent) {
    // to be implemented
  }

}
