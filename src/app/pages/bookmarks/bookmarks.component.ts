import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks: Array<IEvent> = []

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadBookmarks()
  }

  loadBookmarks() {
    if (localStorage.getItem('bookmarks')) {
      const bookmarkIds = JSON.parse(localStorage.getItem('bookmarks')) as Array<string>
      bookmarkIds.forEach(id => {
        this.eventService.getEventDetails(id).forEach(bookmarkData => {
          const bookmark = bookmarkData.payload.data() as IEvent
          if (bookmark) {
            bookmark.startDate = new Date(bookmark.startDate['seconds'] * 1000)
            bookmark.bookmark = true
            this.bookmarks.push({...bookmark, id})
          }
          else {
            const obsoleteId = bookmarkIds.indexOf(id)
            bookmarkIds.splice(obsoleteId, 1)
            localStorage.setItem('bookmarks', JSON.stringify(bookmarkIds))
          }
        })
      })
    }
  }
}
