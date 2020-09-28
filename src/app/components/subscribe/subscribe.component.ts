import { Component, OnInit, Input } from '@angular/core';
import { IChannel } from '../../shared/interfaces/channel.interface';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  @Input() channel: IChannel
  subscribed = true

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('unsubscribed')) {
      const unsubscribed: Array<string> = JSON.parse(localStorage.getItem('unsubscribed'))
      if(unsubscribed.includes(this.channel.id)) {
        this.subscribed = false
      }
    }
  }

  subscribe() {
    if (localStorage.getItem('unsubscribed')) {
      const unsubscribed: Array<string> = JSON.parse(localStorage.getItem('unsubscribed'))
      const index = unsubscribed.findIndex(elem => elem === this.channel.id)
      unsubscribed.splice(index, 1)
      localStorage.setItem('unsubscribed', JSON.stringify(unsubscribed))
      this.subscribed = true
    }
  }

  unsubscribe() {
    if (localStorage.getItem('unsubscribed')) {
      const unsubscribed: Array<string> = JSON.parse(localStorage.getItem('unsubscribed'))
      unsubscribed.push(this.channel.id)
      localStorage.setItem('unsubscribed', JSON.stringify(unsubscribed))
    }
    else {
      localStorage.setItem('unsubscribed', JSON.stringify([this.channel.id]))
    }
    this.subscribed = false
  }

}
