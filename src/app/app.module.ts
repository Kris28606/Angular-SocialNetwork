import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/components/login/login.component';
import { RegisterComponent } from './login/components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/components/home/home.component';
import { ProfilePictureComponent } from './home/components/profile-picture/profile-picture.component';
import { PostComponent } from './home/components/post/post/post.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { NewPostComponent } from './home/components/newPost/new-post/new-post.component';
import { SearchComponent } from './search/search/search.component';
import { ChatComponent } from './chat/components/chat/chat.component';
import { NotificationComponent } from './notifications/components/notification/notification.component';
import { ChatItemComponent } from './chat/components/chatItem/chat-item/chat-item.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfilePictureComponent,
    PostComponent,
    ProfileComponent,
    NewPostComponent,
    SearchComponent,
    ChatComponent,
    NotificationComponent,
    ChatItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
