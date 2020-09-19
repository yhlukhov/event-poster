import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../shared/services/channel.service';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private channelService: ChannelService, private eventService: EventService) { }

  ngOnInit(): void {
    
  }

}
