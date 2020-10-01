import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ChannelService } from '../../shared/services/channel.service';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.scss']
})
export class ChannelDetailsComponent implements OnInit {
  channel: IChannel = null

  constructor(private actRoute: ActivatedRoute,
    private channelService: ChannelService,
    private afStore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.loadChannel()
  }

  loadChannel() {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.channelService.getAllChannels().subscribe(data=>{
      data.forEach(chan => {
        if(chan.id === id) {
          this.channel = chan.data() as IChannel
        }
      })
    })
  }
}
