import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { NewEventComponent } from '../../components/new-event/new-event.component';
import { IEvent } from '../../shared/interfaces/event.interface';
import { AuthService } from '../../shared/services/auth.service';
import { EventService } from '../../shared/services/event.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  channel: IChannel
  events: Array<IEvent> = []

  constructor(
    public dialog: MatDialog,
    private authService: AuthService, 
    private eventService: EventService ) { }

  ngOnInit(): void {
    this.getChannelData()
    this.loadEvents()
  }

  getChannelData() {
    this.channel = JSON.parse(localStorage.getItem('channel'))
  }

  loadEvents() {
    this.events = []
    this.eventService.getChannelEvents(this.channel).onSnapshot(events => {
      events.forEach(event => {
        const eventData = event.data() as IEvent
        const id = event.id
        const newEvent = {...eventData, id}
        newEvent.startDate = new Date(newEvent.startDate['seconds']*1000)
        this.events.push(newEvent)
      })
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(NewEventComponent, {
      width: '450px',
      data: { channel: this.channel, actionAdd: true }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvents()
    });
  }
  openEditDialog(event: IEvent) {
    const dialogRef = this.dialog.open(NewEventComponent, {
      width: '450px',
      data: { channel: this.channel, actionAdd: false, event: event }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvents()
    });
  }

  deleteEvent(event) {
    this.eventService.deleteEvent(event).then(()=>{
      this.loadEvents()
    })
  }

  logout() {
    this.authService.logout()
  }
}
