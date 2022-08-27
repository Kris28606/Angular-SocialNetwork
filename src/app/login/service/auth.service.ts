import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/model/user/userDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl="https://localhost:7042";
  }

  LogIn(user: UserDto):Observable<UserDto> {
    return this.httpClient.post<UserDto>(this.baseUrl+"/login", user);
  }

  Register(user: UserDto):Observable<Object> {
    return this.httpClient.post<Object>(this.baseUrl+"/register", user);
  }
}
