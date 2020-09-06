import { Component, OnInit } from '@angular/core';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ICountry } from '../../shared/interfaces/country.interface';
import { ILanguage } from '../../shared/interfaces/language.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  channel: IChannel
  country: ICountry
  language: ILanguage

  constructor() { }

  ngOnInit(): void {
    this.getChannelData()
  }

  getChannelData() {
    this.channel = JSON.parse(localStorage.getItem('channel'))
    console.log(this.channel)
    this.country = JSON.parse(localStorage.getItem('country'))
    console.log(this.country)
    this.language = JSON.parse(localStorage.getItem('language'))
    console.log(this.language)
  }
}
