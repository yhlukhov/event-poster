import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICountry } from '../../shared/interfaces/country.interface';
import { Country } from '../../shared/models/country.model';
import { ILanguage } from '../../shared/interfaces/language.interface';
import { Language } from '../../shared/models/language.model';
import { Channel } from '../../shared/models/channel.model';
import { AuthService } from '../../shared/services/auth.service';

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

  constructor( private authService: AuthService) { }

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
      channelName: new FormControl('test-channel', [Validators.required, Validators.min(2)]),
      userName: new FormControl('your name', [Validators.required, Validators.min(2)]),
      userEmail: new FormControl('test@mail.ru', [Validators.required, Validators.email]),
      userPassword: new FormControl('qwerty123', [Validators.required, Validators.min(4)]),
      channelCountry: new FormControl('', Validators.required),
      channelLanguage: new FormControl({value: '', disabled: true}, Validators.required),
      channelDescription: new FormControl('', Validators.required)
    })
  }

  selectContry(event) { //registration form - select country
    const countryLangs = event.value?.languages
    if (countryLangs) {
      this.countryLanguages = this.languages.filter(language => countryLangs.includes(language.code))
      this.registerForm.get("channelLanguage").enable()
    }
    else this.registerForm.get("channelLanguage").disable()
  }

  loginFormSubmit() {
    const {userEmail, userPassword} = this.loginForm.value
    this.authService.login(userEmail, userPassword)
  }
  registerFormSubmit() {
    const {channelName, userName, userEmail, userPassword, channelCountry, channelLanguage, channelDescription} = this.registerForm.value
    this.authService.registerChannel(new Channel(channelName, userName, userEmail, userPassword, channelCountry, channelLanguage, channelDescription))
  }

  switchLoginReg() {
    this.isLogin = !this.isLogin
  }

}
