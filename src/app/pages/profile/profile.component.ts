import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ICountry } from '../../shared/interfaces/country.interface';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { NewEventComponent } from '../../components/new-event/new-event.component';
import { IEvent } from '../../shared/interfaces/event.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  channel: IChannel
  event: IEvent

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getChannelData()
  }

  getChannelData() {
    this.channel = JSON.parse(localStorage.getItem('channel'))
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(NewEventComponent, {
      width: '450px',
      data: {channel: this.channel}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.event = result;
      console.log(this.event)
    });
  }

  logout() {
    this.authService.logout()
  }
}
