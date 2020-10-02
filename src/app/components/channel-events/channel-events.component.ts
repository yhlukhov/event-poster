import { Component, OnInit, Input } from '@angular/core';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel-events',
  templateUrl: './channel-events.component.html',
  styleUrls: ['./channel-events.component.scss']
})
export class ChannelEventsComponent implements OnInit {
  @Input() channel: IChannel
  events: Array<IEvent> = []
  load = true

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents()
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

  showEvents() {
    this.load = !this.load
  }

  approve(event: IEvent) {
    event.approved = true
    this.eventService.editEvent(event).then(() => {
      this.loadEvents()
    })
  }
  disapprove(event: IEvent) {
    event.approved = false
    this.eventService.editEvent(event).then(() => {
      this.loadEvents()
    })
  }

  delete(event: IEvent) {
    if (confirm("Are you sure you want to delete event?"))
      this.eventService.deleteEvent(event).then(() => {
        this.loadEvents()
      })
  }
}
