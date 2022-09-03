import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/components/chat/chat.component';
import { HomeComponent } from './home/components/home/home.component';
import { LoginComponent } from './login/components/login/login.component';
import { RegisterComponent } from './login/components/register/register.component';
import { NotificationComponent } from './notifications/components/notification/notification.component';
import { ProfileComponent } from './profile/components/profile/profile.component';
import { GuardGuard } from './token/guard.guard';

const routes: Routes = [
  {
    path:'login', component: LoginComponent
  },
  {
    path:'', redirectTo: 'login', pathMatch: 'full' ,
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path: 'home/:id', component: HomeComponent,
    canActivate: [GuardGuard] 
  },
  {
    path: 'profile/:id', component: ProfileComponent,
    canActivate: [GuardGuard] 
  },
  {
    path: 'chat', component: ChatComponent,
    canActivate: [GuardGuard] 
  },
  {
    path: 'notifications', component: NotificationComponent,
    canActivate: [GuardGuard] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
