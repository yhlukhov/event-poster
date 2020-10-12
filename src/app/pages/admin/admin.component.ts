import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../shared/services/channel.service';
import { EventService } from '../../shared/services/event.service';
import { IChannel } from 'src/app/shared/interfaces/channel.interface';
import { Channel } from '../../shared/models/channel.model';
import { from } from 'rxjs';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { ICountry } from '../../shared/interfaces/country.interface';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  channels: Array<IChannel> = []
  filterPattern = "" // поле для фильтра

  constructor(private channelService: ChannelService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadChannels()
  }

  loadChannels() {
    this.channels = []
    this.channelService.getAllChannels().subscribe((channels) => {
      channels.forEach(channel => {
        const data = channel.data()
        const { name, userName, userEmail, userPassword, country, language, description, image, userRole, subscribe, approved, id } = data
        this.channels.push({ name, userName, userEmail, country, language, description, image, userRole, subscribe, approved, id } as IChannel)
      })
    })
  }

  delete(channel: IChannel) {
    if (confirm("Вы уверенны что хотите удалить канал? Все события канала будуть так же удалены!")) {
      this.eventService.getChannelEvents(channel).get().then(event => {
        event.forEach(record => {
          const data = record.data() as IEvent
          const id = record.id
          const event = { ...data, id }
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

  approve(channel: IChannel) {
    channel.approved = true
    channel.language = { ...channel.language as ILanguage }
    channel.country = { ...channel.country as ICountry }
    this.channelService.editChannel({ ...channel } as IChannel)
  }
  disapprove(channel: IChannel) {
    if (confirm("Вы действительно хотите заблокировать канал?")) {
      channel.approved = false
      channel.language = { ...channel.language as ILanguage }
      channel.country = { ...channel.country as ICountry }
      this.channelService.editChannel({ ...channel } as IChannel)
    }
  }
  
}
