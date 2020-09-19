import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from '../../shared/interfaces/event.interface';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  @Input() event: IEvent
  eventBookmarks: Array<string> = []

  constructor() { }

  ngOnInit(): void {
  }

  addBookmark(event: IEvent) {
    if (localStorage.getItem('bookmarks'))
      this.eventBookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    this.eventBookmarks.push(event.id)
    localStorage.setItem('bookmarks', JSON.stringify(this.eventBookmarks))
    event.bookmark = true
  }

  removeBookmark(event: IEvent) {
    this.eventBookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    const index = this.eventBookmarks.indexOf(event.id)
    this.eventBookmarks.splice(index, 1)
    localStorage.setItem('bookmarks', JSON.stringify(this.eventBookmarks))
    event.bookmark = false
  }
}
