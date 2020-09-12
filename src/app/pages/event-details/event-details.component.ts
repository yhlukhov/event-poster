import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../shared/services/event.service';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvent()
  }

  loadEvent() {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.eventService.getEventDetails(id)
  }

}
