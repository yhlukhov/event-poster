import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { ILanguage } from 'src/app/shared/interfaces/language.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  aos = "fade-up"
  collection: Array<IEvent>
  countryFilter: Array<ICountry> = []
  languageFilter: Array<ILanguage> = []

  constructor(
    private eventService: EventService,
    private router: Router,
    private actRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loadCollection()
    this.loadFilters()
  }

  loadCollection() {
    this.eventService.getAllEvents().subscribe(data => {
      this.collection = []
      data.forEach(eventObj => {
        const id = eventObj.payload.doc.id
        const data = eventObj.payload.doc.data() as Object
        const event = {...data, id} as IEvent
        this.collection.push(event)
      })
    })
  }
  loadFilters() {
    if(localStorage.getItem('countryFilter'))
      this.countryFilter = JSON.parse(localStorage.getItem('countryFilter'))
  }

  onCountryFilter(countries: Array<ICountry>) {
    localStorage.setItem('countryFilter', JSON.stringify(countries))
    this.countryFilter = countries
  }
  onLanguageFilter(languages: Array<ILanguage>) {
    this.languageFilter = languages
  }
}
