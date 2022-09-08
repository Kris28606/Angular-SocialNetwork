import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/token/token.service';
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
}
