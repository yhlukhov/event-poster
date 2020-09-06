import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  aos = "fade-up"
  collection = [
    {
      channel: "Admin",
      firstName: "Юра",
      lastName: "Глухов",
      country: "Україна",
      languages: ['ukrainian', 'russian', 'english'],
      email: "yhlukhov@gmail.com",
      description: "Admin"
    },
    {
      channel: "Admin",
      firstName: "Юра",
      lastName: "Глухов",
      country: "Україна",
      languages: ['ukrainian', 'russian', 'english'],
      email: "yhlukhov@gmail.com",
      description: "Admin"
    },
    {
      channel: "Admin",
      firstName: "Юра",
      lastName: "Глухов",
      country: "Україна",
      languages: ['ukrainian', 'russian', 'english'],
      email: "yhlukhov@gmail.com",
      description: "Admin"
    },
    {
      channel: "Admin",
      firstName: "Юра",
      lastName: "Глухов",
      country: "Україна",
      languages: ['ukrainian', 'russian', 'english'],
      email: "yhlukhov@gmail.com",
      description: "Admin"
    }
  ]
  constructor(
    // @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit(): void {
    // this._document.body.style.background = 'AntiqueWhite';
  }

}
