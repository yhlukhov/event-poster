import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IChannel } from '../interfaces/channel.interface';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private afStore: AngularFirestore) { }

  getAllChannels():Observable<firestore.QuerySnapshot<firestore.DocumentData>> {
    return this.afStore.collection('channels').get()
  }

  getChannels(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afStore.collection('channels').snapshotChanges()
  }
  
  getChannel(id:string) {
    return this.afStore.collection('channels').ref.where("id", "==", id)
  }
  getChannelByName(name:string) {
    return this.afStore.collection('channels').ref.where("name", "==", name)
  }

  getLanguage(id:string): AngularFirestoreDocument<unknown> {
    return this.afStore.collection('languages').doc(id)
  }

  editChannel(channel: IChannel):Promise<void> {
    return this.afStore.collection('channels').doc(channel.id).update(channel)
  }

  deleteChannel(channel: IChannel):Promise<void> {
    return this.afStore.collection('channels').doc(channel.id).delete()
  }

}
