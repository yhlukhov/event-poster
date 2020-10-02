import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../shared/services/channel.service';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { ICountry } from '../../shared/interfaces/country.interface';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channels: IChannel[]
  countryFilter: Array<string> = []
  languageFilter: Array<string> = []

  constructor(private channelService: ChannelService) { }

  ngOnInit(): void {
    this.loadChannels()
    this.loadFilters()
  }

  loadChannels() {
    this.channelService.getAllChannels().subscribe(channels => {
      this.channels = channels.docs.map(doc => {
        return doc.data() as IChannel
      })
      this.channels = this.channels.filter(channel => channel.approved == true)
      if(localStorage.getItem('unsubscribe')) {
        const unsubscribed: Array<any> = JSON.parse(localStorage.getItem('unsubscribe'))
        unsubscribed.forEach(id => {
          console.log(id)
        })
      }
    })
  }
  loadFilters() {
    if(localStorage.getItem('countryFilter'))
      this.countryFilter = JSON.parse(localStorage.getItem('countryFilter'))
    if(localStorage.getItem('languageFilter'))
      this.languageFilter = JSON.parse(localStorage.getItem('languageFilter'))
  }

  onCountryFilter(countries:Array<string>) {
    localStorage.setItem('countryFilter', JSON.stringify(countries))
    this.countryFilter = countries
    console.log('channels: onCountryFilter()')
  }

  onLanguageFilter(languages:Array<string>) {
    localStorage.setItem('languageFilter', JSON.stringify(languages))
    this.languageFilter = languages
    console.log('channels: onLanguageFilter()')
  }

}
