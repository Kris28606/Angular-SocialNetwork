import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { LoginComponent } from './login/components/login/login.component';
import { RegisterComponent } from './login/components/register/register.component';
import { ProfileComponent } from './profile/components/profile/profile.component';

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
    path: 'home/:id', component: HomeComponent
  },
  {
    path: 'profile/:id', component: ProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
