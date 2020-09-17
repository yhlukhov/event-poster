import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks: Array<IEvent> = []
  
  constructor() { }

  ngOnInit(): void {
    this.loadBookmarks()
  }

  loadBookmarks() {
    if (localStorage.getItem('bookmarks'))
      this.bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
      this.bookmarks.forEach(bookmark => {
        bookmark.bookmark = true
      })
  }
}
