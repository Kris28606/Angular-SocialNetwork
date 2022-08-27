import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../home/components/post/model/post';
import { UserDto } from '../model/user/userDto';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    this.baseUrl="https://localhost:7042";
  }

  ucitajUsera(id: number):Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/user/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  GetMyPosts(id: number):Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/user/all/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
}
