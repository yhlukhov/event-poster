import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICountry } from '../../shared/interfaces/country.interface';
import { Country } from '../../shared/models/country.model';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { Language } from '../../shared/models/language.model';
import { Channel } from '../../shared/models/channel.model';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  registerForm: FormGroup
  isLogin = true //login or register
  
  countries: Array<ICountry> = [] //populates on Init in method initData()
  languages: Array<ILanguage> = [] //populates on Init in method initData()
  countryLanguages: Array<ILanguage> = [] //array of native languages of selected Country
  englishLanguage: ILanguage // populates in method initData()

  image: string = "https://firebasestorage.googleapis.com/v0/b/goldenagemeditat-1580825076192.appspot.com/o/images%2Fheart.png?alt=media&token=cf7a9778-d739-4c42-a5d1-54a3e773d4c7"
  imageSizeValid = true
  imageLoadProgress: Observable<Number>
  imageLoadStatus = false

  constructor( private authService: AuthService, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.loginFormInit()
    this.registerFormInit()
    this.initData()
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
      this.englishLanguage = this.languages.find(lang => lang.code==='en')
    })
  }

  loginFormInit() {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('test@mail.ru', [Validators.required, Validators.email]),
      userPassword: new FormControl('qwerty123', [Validators.required])
    })
  }
  registerFormInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('test-channel', [Validators.required, Validators.min(2)]),
      userName: new FormControl('your name', [Validators.required, Validators.min(2)]),
      userEmail: new FormControl('test@mail.ru', [Validators.required, Validators.email]),
      userPassword: new FormControl('qwerty123', [Validators.required, Validators.min(4)]),
      country: new FormControl('', Validators.required),
      language: new FormControl({value: '', disabled: true}, Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl()
    })
  }

  selectContry(event) { //registration form - select country
    const countryLangs = event.value?.languages
    if (countryLangs) {
      this.countryLanguages = this.languages.filter(language => countryLangs.includes(language.code))
      this.registerForm.get("language").enable()
    }
    else this.registerForm.get("language").disable()
  }

  loginFormSubmit() {
    const {userEmail, userPassword} = this.loginForm.value
    this.authService.login(userEmail, userPassword)
  }
  registerFormSubmit() {
    const {name, userName, userEmail, userPassword, country, language, description} = this.registerForm.value
    this.authService.registerChannel(new Channel(name, userName, userEmail, userPassword, country, language, description, this.image))
  }

  switchLoginReg() {
    this.isLogin = !this.isLogin
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

}
