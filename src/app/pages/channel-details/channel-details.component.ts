import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IChannel } from '../../shared/interfaces/channel.interface';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.scss']
})
export class ChannelDetailsComponent implements OnInit {
  channel: IChannel

  constructor(private actRoute: ActivatedRoute,
    private afStore: AngularFirestore) {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.afStore.collection('channels').ref.where("id", "==", id).onSnapshot(snapshot => {
      snapshot.forEach(channel => {
        this.channel = channel.data() as IChannel
      })
    })
  }

  ngOnInit(): void {
  }
}
