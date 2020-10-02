import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { IEvent } from '../../shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';
import { Event } from '../../shared/models/event.model';
import { Observable } from 'rxjs';
import { IChannel } from '../../shared/interfaces/channel.interface';
import { ICountry } from '../../shared/interfaces/country.interface';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { Country } from '../../shared/models/country.model';
import { Language } from '../../shared/models/language.model';
import { ChannelService } from '../../shared/services/channel.service';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss']
})
export class EditChannelComponent implements OnInit {
  editChannelForm: FormGroup
  countries: Array<ICountry> = [] //populates on Init in method initData()
  languages: Array<ILanguage> = [] //populates on Init in method initData()
  currentLanguage: ILanguage // populates in method initData()
  image = this.data.channel.image
  imageSizeValid = true
  imageLoadProgress: Observable<Number>
  imageLoadStatus = false

  constructor(
    public dialogRef: MatDialogRef<EditChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private channelService: ChannelService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.initEditForm()
    this.initData()
  }

  initEditForm() {
    const channel = this.data.channel as IChannel
    this.editChannelForm = new FormGroup({
      name: new FormControl(channel.name, [Validators.required, Validators.min(2)]),
      userName: new FormControl(channel.userName, [Validators.required, Validators.min(2)]),
      userEmail: new FormControl(channel.userEmail, [Validators.required, Validators.email]),
      country: new FormControl(channel.country, Validators.required),
      language: new FormControl(channel.language, Validators.required),
      description: new FormControl(channel.description, Validators.required),
      image: new FormControl()
    })
  }

  initData() {
    fetch("./assets/json-data/countries.json").then(countries => countries.json()).then(countries => { // fetch Countries from json file
      const countriesList = Object.entries(countries)
      countriesList.forEach(country => {
        const code = country[0]
        const {name, native, languages} = country[1] as ICountry
        this.countries.push(new Country(code, name, native, languages))
      })
    })
    fetch("./assets/json-data/languages.json").then(languages => languages.json()).then(languages => {
      const languagesList = Object.entries(languages)
      languagesList.forEach(language => {
        this.languages.push(new Language(language[0], language[1]["name"], language[1]["native"]))
      })
    })
    this.currentLanguage = this.data.channel.language as ILanguage
  }

  uploadFile(event) {
    const file = event.target.files[0]
    
    this.imageLoadStatus = false
    if (file.size < 1000000) {
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

  editChannelFormSubmit() {
    const {name, userName, userEmail, country, language, description} = this.editChannelForm.value
    const channel = this.data.channel as IChannel
    this.data.channel.name = name
    this.data.channel.userName = userName
    this.data.channel.userEmail = userEmail
    this.data.channel.country = {...country} as ICountry
    this.data.channel.language = {...language} as ILanguage
    this.data.channel.description = description
    this.data.channel.image = this.image
    console.log(this.data.channel)
    this.channelService.editChannel(this.data.channel).then(()=>{
      this.dialogRef.close()
    }).catch(console.log)
  }

}
