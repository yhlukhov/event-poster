import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IChannel } from '../interfaces/channel.interface';
import { utf8Encode } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerChannel(channel: IChannel) {

    this.afAuth.createUserWithEmailAndPassword(channel.userEmail, channel.userPassword).then(afUser => {
      const newChannel = {
        name: channel.name,
        userName: channel.userName,
        userEmail: afUser.user.email,
        country: { ...channel.country },
        language: { ...channel.language },
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
    })
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      this.afStore.collection('channels').ref.where('id', '==', user.user.uid).onSnapshot(snap => {
        snap.forEach(channel => {
          localStorage.setItem('channel', JSON.stringify(channel.data()))
          this.router.navigateByUrl('profile')
        })
      })
    })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('channel')
      this.router.navigateByUrl('login')
    })
  }

  checkAdmin():boolean {
    if (localStorage.getItem('channel')) {
      const channel = JSON.parse(localStorage.getItem('channel'))
      if (channel.userRole === 'admin-2311') {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  checkLoggedIn():boolean {
    if (localStorage.getItem('channel')) {
      return true
    }
    else { 
      return false
    }
  }

}


