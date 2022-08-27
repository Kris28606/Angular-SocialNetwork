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
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfilePictureComponent,
    PostComponent,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
