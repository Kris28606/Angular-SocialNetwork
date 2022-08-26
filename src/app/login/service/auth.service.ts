import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl="https://localhost:7042";
  }

  LogIn(user: User):Observable<User> {
    return this.httpClient.post<User>(this.baseUrl+"/login", user);
  }

  Register(user: User):Observable<Object> {
    return this.httpClient.post<Object>(this.baseUrl+"/register", user);
  }
}
