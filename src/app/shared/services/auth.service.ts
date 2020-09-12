import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IChannel } from '../interfaces/channel.interface';
import { ICountry } from '../interfaces/country.interface';
import { ILanguage } from '../interfaces/language.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
    ) { }

  registerChannel(channel: IChannel) {
    
    this.afAuth.createUserWithEmailAndPassword(channel.userEmail, channel.userPassword).then(afUser => {
      const newChannel = {
        name: channel.name,
        userName: channel.userName,
        userEmail: afUser.user.email,
        country: {...channel.country},
        language: {...channel.language},
        description: channel.description,
        userRole: channel.userRole,
        id: afUser.user.uid
      }
      
      this.afStore.collection('channels').add(newChannel).then(afChannelData => {
        afChannelData.get().then(afChannel => {
          localStorage.setItem('channel', JSON.stringify(afChannel.data()))
          this.router.navigateByUrl('profile')
        }).catch(console.log)
      }).catch(console.log)
      
      // this.afStore.collection('countries').add({...channel.country}).then(()=>{
      //   this.lsLoadCountry(channel.country)
      // }).catch(console.log)
      // this.afStore.collection('languages').add({...channel.language}).then(()=>{
      //   this.lsLoadLanguage(channel.language)
      // }).catch(console.log)
    })
  }

  login(email:string, password:string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(user=>{
      this.afStore.collection('channels').ref.where('id', '==', user.user.uid).onSnapshot(snap => {
        snap.forEach(collection => {
          localStorage.setItem('channel', JSON.stringify(collection.data()))
          this.router.navigateByUrl('profile')
          this.lsLoadCountry(collection.data().countryCode)
          this.lsLoadLanguage(collection.data().languageCode)
        })
      })
    })
  }

  logout() {
    this.afAuth.signOut().then(()=>{
      localStorage.removeItem('channel')
      this.router.navigateByUrl('login')
    })
  }

  lsLoadCountry(country: ICountry) {
    this.afStore.collection('countries').ref.where('code', '==', country.code).onSnapshot(snap => {
      snap.forEach(country => {
        localStorage.setItem('country', JSON.stringify(country.data()))
      })
    })
  }
  lsLoadLanguage(language: ILanguage) {
    this.afStore.collection('languages').ref.where('code', '==', language.code).onSnapshot(snap => {
      snap.forEach(language => {
        localStorage.setItem('language', JSON.stringify(language.data()))
      })
    })
  }

}


