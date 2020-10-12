import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ChannelService } from '../../shared/services/channel.service';
import { EventService } from '../../shared/services/event.service';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.scss']
})
export class ChannelDetailsComponent implements OnInit {
  channel: IChannel = null
  events: Array<IEvent> = []

  constructor(private actRoute: ActivatedRoute,
    private channelService: ChannelService,
    private eventService: EventService,
    private afStore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.loadChannel()
    // this.loadEvents()
  }

  loadChannel() {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.channelService.getAllChannels().subscribe(data=>{
      data.forEach(channel => {
        if(channel.id === id) {
          const data = channel.data()
          const id = channel.id
          this.channel = {...data, id} as IChannel
          this.loadEvents()
        }
      })
    })
  }

  loadEvents() {
    this.events = []
    this.eventService.getChannelEvents(this.channel).onSnapshot((snap) => {
      snap.forEach(event => {
        const data = event.data()
        const id = event.id
        const newEvent = { ...data, id } as IEvent
        this.events.push(newEvent)
      })
    })
  }
}
