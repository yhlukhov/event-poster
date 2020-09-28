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
        const channelObj = channel.data()
        const { name, userName, userEmail, userPassword, country, language, description, userRole, subscribe, id } = channelObj
        this.channels.push(new Channel(name, userName, userEmail, userPassword, country, language, description, userRole, subscribe, id))
      })
    })
  }

  delete(channel: IChannel) {
    if (confirm("Are you sure?")) {
      const channelEvents: Array<IEvent> = []
      this.eventService.getChannelEvents(channel).onSnapshot((snap) => {
        snap.forEach(event => {
          const data = event.data()
          const id = event.id
          const newEvent = { ...data, id } as IEvent
          channelEvents.push(newEvent)
        })
        if (channelEvents.length > 0) {
          console.log(channelEvents)
          if (confirm("All the channel events will be also deleted. Proceed?")) {
            channelEvents.forEach(event => {
              this.eventService.deleteEvent(event).then(() => {
                console.log("event deleted")
              })
            })
            this.channelService.deleteChannel(channel).then(() => {
              console.log("channel deleted!")
              this.loadChannels()
            })
          }
        }
        else {
          this.channelService.deleteChannel(channel).then(() => {
            console.log("channel deleted!")
            this.loadChannels()
          })
        }
      })
    }
  }

}
