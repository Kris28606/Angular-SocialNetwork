import { HttpClientJsonpModule, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../model/user/userDto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string="";
  userId: number=0;

  constructor() { }

  postaviToken(tok: string) {
    this.token="Bearer "+tok;
  }

  vratiToken(): string {
    return this.token;
  }

  postaviUsera(id: number) {
    this.userId=id;
  }

  vratiUsera(): number {
    return this.userId;
  }
}
