import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { IChannel } from '../interfaces/channel.interface';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  allChannels: IChannel[]

  constructor(private afStore: AngularFirestore) { }

  getAllChannels() {
    return this.afStore.collection('channels').get()
  }
  
  getChannel(id:string) {
    return this.afStore.collection('channels').ref.where("id", "==", id)
  }

  getLanguage(id:string) {
    this.afStore.collection('languages').doc(id)
  }

}
