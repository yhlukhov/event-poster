import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  aos = "fade-up"
  collection: Array<IEvent>
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadCollection()
  }

  loadCollection() {
    this.eventService.getAllEvents().subscribe(data => {
      this.collection = []
      data.forEach(event => {
        // const id = event.payload.doc.id
        const data = event.payload.doc.data() as IEvent
        this.collection.push(data)
      })
    })
  }

}
