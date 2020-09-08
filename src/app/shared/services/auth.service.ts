import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IChannel } from '../interfaces/channel.interface';

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
        id: afUser.user.uid,
        channelName: channel.channelName,
        userName: channel.userName,
        userEmail: afUser.user.email,
        countryCode: channel.channelCountry.code,
        languageCode: channel.channelLanguage.code,
        channelDescription: channel.channelDescription,
        userRole: channel.userRole
      }
      this.afStore.collection('channels').add(newChannel).then(afChannelData => {
        afChannelData.get().then(afChannel => {
          localStorage.setItem('channel', JSON.stringify(afChannel.data()))
          this.router.navigateByUrl('profile')
        }).catch(console.log)
      }).catch(console.log)
      this.afStore.collection('countries').add(Object.assign({}, channel.channelCountry)).then(()=>{
        this.lsLoadCountry(channel.channelCountry.code)
      }).catch(console.log)
      this.afStore.collection('languages').add(Object.assign({}, channel.channelLanguage)).then(()=>{
        this.lsLoadLanguage(channel.channelLanguage.code)
      }).catch(console.log)
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

  lsLoadCountry(countryCode: string) {
    this.afStore.collection('countries').ref.where('code', '==', countryCode).onSnapshot(snap => {
      snap.forEach(country => {
        localStorage.setItem('country', JSON.stringify(country.data()))
        // console.log('localStorage.setItem(country)')
      })
    })
  }
  lsLoadLanguage(languageCode: string) {
    this.afStore.collection('languages').ref.where('code', '==', languageCode).onSnapshot(snap => {
      snap.forEach(language => {
        localStorage.setItem('language', JSON.stringify(language.data()))
        // console.log('localStorage.setItem(language)')
      })
    })
  }

}


