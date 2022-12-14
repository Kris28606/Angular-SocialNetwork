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

  ucitajUseraId(id: number, username: String):Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/one/${id}/${username}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  ucitajUsera(username: string):Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.baseUrl}/${username}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  GetMyPosts(id: number, username: string):Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/all/${id}/${username}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
  
  SearchUsers(kriterijum: String, id: number):Observable<UserDto[]> {
    return this.httpClient.post<UserDto[]>(`${this.baseUrl}/search/${id}`, JSON.stringify(kriterijum),
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  changeProfilePicture(user: UserDto):Observable<Object> {
    return this.httpClient.post<Object>(`${this.baseUrl}/changePicture`, user,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  Unfollow(username: string, unfollowId: number):Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/unfollow/${username}/${unfollowId}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  AddFollower(userId: number, followId: number):Observable<Object> {
    return this.httpClient.post<Object>(`${this.baseUrl}/follow/${userId}/${followId}`,null,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  GetRandomUsers(id: number):Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${this.baseUrl}/random/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
}
