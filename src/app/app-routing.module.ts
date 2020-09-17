import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { ChannelDetailsComponent } from './pages/channel-details/channel-details.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { ProfileGuard } from './shared/guards/profile.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: ''},
  { path: 'channels', component: ChannelsComponent }, 
  { path: 'channels/:id', component: ChannelDetailsComponent }, 
  { path: 'event/:country/:channel/:id', component: EventDetailsComponent }, 
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
