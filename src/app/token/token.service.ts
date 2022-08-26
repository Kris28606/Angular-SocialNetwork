import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string="";

  constructor() { }

  postaviToken(tok: string) {
    this.token="Bearer "+tok;
  }

  vratiToken(): string {
    return this.token;
  }
}
