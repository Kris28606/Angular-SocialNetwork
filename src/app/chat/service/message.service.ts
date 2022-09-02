import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';
import { Message } from '../model/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    this.baseUrl="https://localhost:7042/message";
   }

  getInboxUsers(forId: number):Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${this.baseUrl}/inbox/${forId}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  getMessages(forId:number, fromId:number):Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.baseUrl}/${forId}/${fromId}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  sendMessage(mess: Message):Observable<Message> {
    return this.httpClient.post<Message>(`${this.baseUrl}/send`, mess,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
}
