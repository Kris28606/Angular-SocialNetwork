import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../home/components/post/model/post';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    this.baseUrl="https://localhost:7042/post";
  }

  getPostsForUser(id: number):Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/all/${id}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
  createPost(post: Post):Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/new`, post,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken()), responseType: 'arraybuffer'});
  }

  likeIt(postId:number,user: string):Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/like/${postId}/${user}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  unliked(postId: number, user:string):Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/unlike/${postId}/${user}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
}
