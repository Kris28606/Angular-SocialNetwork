import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private baseUrl;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    this.baseUrl="https://localhost:7042/picture"
  }

  uploadPicture(file: FormData):Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/upload`, file,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken()), responseType: 'text'});
  }
}
