import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { from } from 'rxjs';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.scss']
})
export class ChannelDetailsComponent implements OnInit {
  channel: IChannel
  constructor(private actRoute: ActivatedRoute, private afStore: AngularFirestore) { }

  ngOnInit(): void {
    this.getChannel()
  }

  getChannel() {
    const id = this.actRoute.snapshot.paramMap.get('id')
    this.afStore.collection('channels').snapshotChanges().subscribe(data => {
      data.forEach(chan => {
        const data = chan.payload.doc.data() as IChannel
        if(data.id === id) {
          this.channel = {...data}
        }
      })
    })
  }
}
