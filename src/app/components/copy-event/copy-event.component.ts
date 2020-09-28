import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { IEvent } from '../../shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';
import { Event } from '../../shared/models/event.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-copy-event',
  templateUrl: './copy-event.component.html',
  styleUrls: ['./copy-event.component.scss']
})
export class CopyEventComponent implements OnInit {
  copyEventForm: FormGroup
  today = (new Date()).toISOString().slice(0, 16)
  eventRepeat = "Не повторять"
  number = [2,3,4,5,6,7,8,9,10,11,12,13,14]
  daysList: Array<Date> = []
  

  constructor(
    public dialogRef: MatDialogRef<CopyEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.initCopyForm()
  }


  initCopyForm() {
    const event = this.data.event as IEvent
    this.copyEventForm = new FormGroup({
      eventStartDate: new FormControl(this.getDateString(event), [Validators.required]),
      eventRepeat: new FormControl("Не повторять", [Validators.required]),
      number: new FormControl("2"),
      days: new FormControl()
    })
    
  }

  chooseRepeat() {
    this.eventRepeat = this.copyEventForm.controls.eventRepeat.value

    if(this.eventRepeat === "Выберете дни") {
      this.daysList = []
      const days = []
      const today = new Date();
      const numberOfDaysInMonth = (new Date(today.getFullYear(), (today.getMonth()+1)%12, 0)).getDate()
      let day = today.getDate()
      let month = today.getMonth()
      let year = today.getFullYear()
      days.push({
        year: year,
        month: month,
        day: day
      })
      for (let i = 1; i<=14; i++) {
        if(++day>numberOfDaysInMonth) {
          day = day%numberOfDaysInMonth
          if(++month >= 12) {
            month = month%12
            ++year
          }
        }
        days.push({
          year: year,
          month: month,
          day: day
        })
      }
      days.forEach(day => {
        this.daysList.push(new Date(day.year, day.month, day.day))
      })
    }
  }

  getDateString(event: IEvent) {
    const startDate = event.startDate
    return event.startDate.getFullYear() + '-'
    + (event.startDate.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '-'
    + event.startDate.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + 'T'
    + event.startDate.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ':'
    + event.startDate.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  }

}
