import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  aos = "fade-up"
  collection: Array<IEvent>
  countryFilter: Array<string> = []
  languageFilter: Array<string> = []
  subscribeFilter: Array<string> = []
  bookmarks: Array<string> = []
  i = 0

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
    this.loadBookmarks()
    this.eventService.getAllEvents().subscribe(data => {
      this.collection = []
      data.forEach(eventObj => {
        const id = eventObj.payload.doc.id
        const data = eventObj.payload.doc.data() as Object
        const event = {...data, id} as IEvent
        event.startDate = new Date(event.startDate['seconds']*1000)
        if(this.bookmarks.findIndex(bookmark => bookmark === event.id) !== -1) event.bookmark = true
        this.collection.push(event)
      })
    })
  }
  loadFilters() {
    if(localStorage.getItem('countryFilter'))
      this.countryFilter = JSON.parse(localStorage.getItem('countryFilter'))
    if(localStorage.getItem('languageFilter'))
      this.languageFilter = JSON.parse(localStorage.getItem('languageFilter'))
    if(localStorage.getItem('unsubscribed'))
      this.subscribeFilter = JSON.parse(localStorage.getItem('unsubscribed'))
    
  }
  loadBookmarks() {
    if (localStorage.getItem('bookmarks')) {
      this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }
  }

  onCountryFilter(countries: Array<string>) {
    localStorage.setItem('countryFilter', JSON.stringify(countries))
    this.countryFilter = countries
  }
  onLanguageFilter(languages: Array<string>) {
    localStorage.setItem('languageFilter', JSON.stringify(languages))
    this.languageFilter = languages
  }

  counter() {
    let count = 0;
    return ()=> {
      return ++count%8;
    };
  }

}