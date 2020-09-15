import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
// import { IEvent } from '../../shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';
import { Event } from '../../shared/models/event.model';
// import {ProgressBarMode} from '@angular/material/progress-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  addEventForm: FormGroup
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  image: string
  imageLoadProgress: Observable<Number>
  imageLoadStatus = false
  eventAdded = false

  constructor(
    public dialogRef: MatDialogRef<NewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.addEventForm = new FormGroup({
      eventName: new FormControl('Название события', [Validators.required, Validators.min(2)]),
      eventOrganizer: new FormControl('Организатор(ы)', [Validators.required, Validators.min(2)]),
      eventStartDate: new FormControl('', [Validators.required]),
      eventDescription: new FormControl('Описание события'),
      eventAddress: new FormControl('Место проведения или адрес'),
      eventLink: new FormControl('https://www.google.com', [Validators.required, Validators.pattern(this.urlRegex)]),
      eventImage: new FormControl(),
    })
  }

  onNoClick() {
    this.dialogRef.close()
  }

  createEvent() {
    const {eventName, eventOrganizer, eventStartDate, eventDescription, eventAddress, eventLink} = this.addEventForm.value
    const event = new Event(eventName, eventOrganizer, new Date(eventStartDate), eventDescription, eventAddress, eventLink, this.image, this.data.channel)
    this.eventService.addEvent(event).then(() => {
      console.log("Event created")
      this.dialogRef.close()
    }).catch(console.log)
  }

  uploadFile(event) {
    const file = event.target.files[0]
    const type = file.type.slice(file.type.indexOf('/') + 1)
    const name = file.name.slice(0, file.name.lastIndexOf('.'))
    const path = `images/${name}.${type}`
    const upload = this.afStorage.upload(path, file)
    this.imageLoadProgress = upload.percentageChanges()
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url
        this.imageLoadStatus = true
      })
    })
  }

}
