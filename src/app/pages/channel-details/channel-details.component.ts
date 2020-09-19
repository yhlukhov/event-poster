import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { from } from 'rxjs';
import { ChannelService } from '../../shared/services/channel.service';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.scss']
})
export class ChannelDetailsComponent implements OnInit {
  channel: IChannel
  constructor(private actRoute: ActivatedRoute, private afStore: AngularFirestore, private channelService: ChannelService) { }

  ngOnInit(): void {
    this.getChannel()
  }

  getChannel() {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.channelService.getChannel(id).onSnapshot((channel)=>{
      channel.forEach(chan=>{
        this.channel = chan.data() as IChannel
      })
    })
  }
}
