import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { NewEventComponent } from '../../components/new-event/new-event.component';
import { IEvent } from '../../shared/interfaces/event.interface';
import { Router } from '@angular/router';
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
  event: IEvent

  constructor(
    public dialog: MatDialog, 
    private router: Router, 
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
      data: { channel: this.channel }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.event = result;
      console.log(this.event)
    });
  }

  editEvent(event) {
    console.log(event)
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
