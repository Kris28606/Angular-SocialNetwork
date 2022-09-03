import { HttpClientJsonpModule, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDto } from '../model/user/userDto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string="";
  userId: number=0;

  constructor(public jwtHelper: JwtHelperService, private router: Router) { }

  postaviToken(tok: string) {
    localStorage.setItem('token', "Bearer "+tok);
  }

  vratiToken() {
    var token=localStorage.getItem('token');
    if(token==null) {
      return "";
    } else {
      return token.toString();
    }
  }

  postaviUsera(usr: UserDto) {
    localStorage.setItem('username', usr.username);
  }

  vratiUsera(): string {
    var user=localStorage.getItem('username');
    if(user==null) {
      return "";
    } else {
      return user.toString();
    }
  }

  isLogged(): boolean {
    return this.vratiToken() != null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    
    return !this.jwtHelper.isTokenExpired(token?.toString());
  }
}
