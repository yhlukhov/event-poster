import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { NewEventComponent } from '../../components/new-event/new-event.component';
import { IEvent } from '../../shared/interfaces/event.interface';
import { AuthService } from '../../shared/services/auth.service';
import { EventService } from '../../shared/services/event.service';
import { CopyEventComponent } from 'src/app/components/copy-event/copy-event.component';
import { EditChannelComponent } from '../../components/edit-channel/edit-channel.component';


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
    private eventService: EventService) { }

  ngOnInit(): void {
    this.getChannelData()
    this.loadEvents()
  }

  getChannelData() { // беру дані з локал стореджу, так як я залогінений і вони там мають зберігатись
    this.channel = JSON.parse(localStorage.getItem('channel'))
  }

  loadEvents() { // загрузка івентів каналу
    this.events = []
    this.eventService.getChannelEvents(this.channel).onSnapshot(events => {
      events.forEach(event => {
        const eventData = event.data() as IEvent
        const id = event.id
        const newEvent = { ...eventData, id }
        newEvent.startDate = new Date(newEvent.startDate['seconds'] * 1000)
        this.events.push(newEvent)
      })
    })
  }

  openAddDialog() { // додати івент
    const dialogRef = this.dialog.open(NewEventComponent, {
      width: '600px',
      data: { channel: this.channel, actionAdd: true }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvents()
    });
  }

  openCopyDialog(event: IEvent) { // копіювати івент
    const dialogRef = this.dialog.open(CopyEventComponent, {
      width: '600px',
      data: { event: event }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvents()
    });
  }

  openEditDialog(event: IEvent) { // редагувати івент
    const dialogRef = this.dialog.open(NewEventComponent, {
      width: '600px',
      data: { channel: this.channel, actionAdd: false, event: event }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEvents()
    });
  }

  deleteEvent(event) {  // видалити івент
    if (confirm("Are you sure?"))
      this.eventService.deleteEvent(event).then(() => {
        this.loadEvents()
      })
  }

  editProfile() {  // редагувати дані каналу (профайлу)
    const dialogRef = this.dialog.open(EditChannelComponent, {
      width: '480px',
      data: { channel: this.channel }
    });
    dialogRef.afterClosed().subscribe(() => {
      // to be added
    });
  }

  logout() {
    this.authService.logout()
  }
}
