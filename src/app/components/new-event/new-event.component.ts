import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { IEvent } from '../../shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';
import { Event } from '../../shared/models/event.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  addEventForm: FormGroup
  today = (new Date()).toISOString().slice(0, 16)
  duration = ['1.5 часа', '2 часа', '3 часа', '4 часа', '5 часов', '6 часов', '8 часов', '10 часов', 'весь день']
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  image: string = "https://firebasestorage.googleapis.com/v0/b/goldenagemeditat-1580825076192.appspot.com/o/images%2Fmeditation-img-1.png?alt=media&token=578765f5-47af-4cb7-9c47-26b6feb372f4"
  imageSizeValid = true
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
    this.data.actionAdd ? this.initAddForm() : this.initEditForm()
  }

  initAddForm() {
    this.addEventForm = new FormGroup({
      eventName: new FormControl('', [Validators.required, Validators.min(2)]),
      eventOrganizer: new FormControl(this.data.channel.userName, [Validators.required, Validators.min(2)]),
      eventStartDate: new FormControl('', [Validators.required]),
      eventDuration: new FormControl("1 час"),
      eventDescription: new FormControl(),
      eventLanguage: new FormControl(this.data.channel.language.native),
      eventLink: new FormControl('', [Validators.required, Validators.pattern(this.urlRegex)]),
      eventImage: new FormControl(),
    })
  }
  initEditForm() {
    const event = this.data.event as IEvent
    this.addEventForm = new FormGroup({
      eventName: new FormControl(event.name, [Validators.required, Validators.min(2)]),
      eventOrganizer: new FormControl(event.organizer, [Validators.required, Validators.min(2)]),
      eventStartDate: new FormControl(this.getDateString(event), [Validators.required]),
      eventDuration: new FormControl(event.duration),
      eventDescription: new FormControl(event.description),
      eventLanguage: new FormControl(event.language),
      eventLink: new FormControl(event.link, [Validators.required, Validators.pattern(this.urlRegex)]),
      eventImage: new FormControl(),
    })
  }

  getDateString(event: IEvent) {
    const startDate = event.startDate
    return event.startDate.getFullYear() + '-'
    + (event.startDate.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '-'
    + event.startDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + 'T'
    + event.startDate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':'
    + event.startDate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  }

  onNoClick() {
    console.log(this.data)
    this.dialogRef.close()
  }

  createEvent() {
    const { eventName, eventOrganizer, eventStartDate, eventDuration, eventDescription, eventLanguage, eventLink } = this.addEventForm.value
    const event = new Event(eventName, eventOrganizer, new Date(eventStartDate), eventDuration, eventDescription, eventLanguage, eventLink, this.image, this.data.channel)
    if (this.data.actionAdd) { // Create
      this.eventService.addEvent(event).then(() => {
        this.dialogRef.close()
      }).catch(console.log)
    }
    else { // Edit
      event.id = this.data.event.id
      this.eventService.editEvent(event).then(() => {
        this.dialogRef.close()
      }).catch(console.log)
    }
  }

  uploadFile(event) {
    const file = event.target.files[0]
    this.imageLoadStatus = false
    if (file.size < 3000000) {
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
    else this.imageSizeValid = false
  }

}
