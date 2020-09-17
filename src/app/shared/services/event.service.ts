import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { IEvent } from '../interfaces/event.interface';
import { Observable } from 'rxjs';
import { IChannel } from '../interfaces/channel.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( private afStore: AngularFirestore) { }

  addEvent(event: IEvent): Promise<DocumentReference> {
    delete(event.id)
    return this.afStore.collection('events').add({...event})
  }

  getAllEvents(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afStore.collection('events').snapshotChanges()
  }

  getChannelEvents(channel: IChannel) {
    return this.afStore.collection('events').ref.where("channel.id", "==", channel.id)
  }

  getEventDetails(id: string) {
    return this.afStore.collection('events').doc(id).snapshotChanges()
  }

  editEvent(event: IEvent) {

  }

  deleteEvent(event: IEvent) {
    console.log(event)
    return this.afStore.collection('events').doc(event.id).delete()
  }

}
