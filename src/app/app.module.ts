import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeEn);
registerLocaleData(localeRu);
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';

import { QuillModule } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { FilterCountryComponent } from './components/filter-country/filter-country.component';
import { FilterLanguageComponent } from './components/filter-language/filter-language.component';
import { FilterCountriesPipe } from './pages/home/filter-countries.pipe';
import { FilterLanguagesPipe } from './pages/home/filter-languages.pipe';
import { FilterChannelCountriesPipe } from './pages/channels/filter-channel-countries.pipe';
import { FilterChannelLanguagesPipe } from './pages/channels/filter-channel-languages.pipe';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { OrderEventsPipe } from './pages/home/order-events.pipe';
import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { ChannelDetailsComponent } from './pages/channel-details/channel-details.component';
import { ChannelEventsComponent } from './components/channel-events/channel-events.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { FilterSubscribePipe } from './pages/home/filter-subscribe.pipe';
import { FilterDatePipe } from './pages/home/filter-date.pipe';
import { CopyEventComponent } from './components/copy-event/copy-event.component';
import { FilterBookmarkDatePipe } from './pages/bookmarks/filter-bookmark-date.pipe';
import { DaysSelectorComponent } from './components/days-selector/days-selector.component';
import { OrderBookmarkEventsPipe } from './pages/bookmarks/order-bookmark-events.pipe';
import { EditChannelComponent } from './components/edit-channel/edit-channel.component';
import { FilterPipe } from './pages/admin/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChannelsComponent,
    AdminComponent,
    LoginComponent,
    ProfileComponent,
    NewEventComponent,
    EventDetailsComponent,
    FilterCountryComponent,
    FilterLanguageComponent,
    FilterCountriesPipe,
    FilterLanguagesPipe,
    FilterChannelCountriesPipe,
    FilterChannelLanguagesPipe,
    BookmarksComponent,
    OrderEventsPipe,
    AddBookmarkComponent,
    ChannelDetailsComponent,
    ChannelEventsComponent,
    SubscribeComponent,
    FilterSubscribePipe,
    FilterDatePipe,
    CopyEventComponent,
    FilterBookmarkDatePipe,
    DaysSelectorComponent,
    OrderBookmarkEventsPipe,
    EditChannelComponent,
    FilterPipe
  ],
  entryComponents: [
    NewEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          ['clean'],
          ['link', 'image', 'video'],
          ['emoji']
        ],
        "emoji-toolbar": false,
        "emoji-shortname": true,
        "emoji-textarea": true
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      // useValue: navigator.language
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
