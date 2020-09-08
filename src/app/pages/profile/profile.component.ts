import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ICountry } from '../../shared/interfaces/country.interface';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { NewChannelComponent } from '../../components/new-channel/new-channel/new-channel.component';
import { IEvent } from '../../shared/interfaces/event.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  channel: IChannel
  country: ICountry
  language: ILanguage

  event: IEvent

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getChannelData()
  }

  getChannelData() {
    this.channel = JSON.parse(localStorage.getItem('channel'))
    this.country = JSON.parse(localStorage.getItem('country'))
    this.language = JSON.parse(localStorage.getItem('language'))
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(NewChannelComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.event = result;
      console.log(this.event)
    });
  }

  logout() {
    localStorage.removeItem('channel')
    this.router.navigateByUrl('home')
  }
}
