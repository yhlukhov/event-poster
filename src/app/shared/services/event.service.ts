import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChange, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { IEvent } from '../interfaces/event.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( private afStore: AngularFirestore) { }

  addEvent(event: IEvent): Promise<DocumentReference> {
    return this.afStore.collection('events').add(Object.assign({}, event))
  }

  getAllEvents(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afStore.collection('events').snapshotChanges()
  }

}
