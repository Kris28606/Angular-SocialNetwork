import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/token/token.service';
import { CommentNotification } from '../model/comment/comment-notification';
import { FollowNotification } from '../model/follow/follow-notification';
import { LikeNotification } from '../model/like-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseURL;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    this.baseURL="https://localhost:7042/notification"
   }

  GetLikeNotif(id: number):Observable<LikeNotification[]> {
    return this.httpClient.get<LikeNotification[]>(`${this.baseURL}/like/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
  GetCommentNotif(id: number):Observable<CommentNotification[]> {
    return this.httpClient.get<CommentNotification[]>(`${this.baseURL}/comment/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  GetFollowNotif(id: number):Observable<FollowNotification[]> {
    return this.httpClient.get<FollowNotification[]>(`${this.baseURL}/follow/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  SendRequest(username: string,id: number):Observable<FollowNotification> {
    return this.httpClient.post<FollowNotification>(`${this.baseURL}/follow/${id}/${username}`,null,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  DeleteRequest(fromWho: number, forWho: number):Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${fromWho}/${forWho}`, {
    headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

}
