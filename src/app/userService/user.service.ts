import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../chat/model/message';
import { Post } from '../home/components/post/model/post';
import { UserDto } from '../model/user/userDto';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    this.baseUrl="https://localhost:7042/user";
  }

  ucitajUseraId(id: number):Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/one/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  ucitajUsera(username: string):Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/${username}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  GetMyPosts(id: number):Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/all/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
  
  SearchUsers(kriterijum: String):Observable<UserDto[]> {
    return this.httpClient.post<UserDto[]>(this.baseUrl+"/search", JSON.stringify(kriterijum),
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  changeProfilePicture(user: UserDto):Observable<Object> {
    return this.httpClient.post<Object>(`${this.baseUrl}/changePicture`, user,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

}
