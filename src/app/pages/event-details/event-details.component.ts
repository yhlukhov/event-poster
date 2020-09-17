import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { IEvent } from '../../shared/interfaces/event.interface';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  event: IEvent
  dayOfWeek = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    0: "Воскресенье"
  }

  constructor(private actRoute: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvent()
  }

  loadEvent() {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.eventService.getEventDetails(id).subscribe(event => {
      const data = event.payload.data() as IEvent
      const id = event.payload.id
      this.event = {...data, id}
      this.event.startDate = new Date(this.event.startDate['seconds']*1000)
    })
  }

  
}
