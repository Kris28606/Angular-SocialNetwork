import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../home/components/post/model/post';
import { Comment } from '../model/comment/comment';
import { CommentRequest } from '../model/comment/comment-request';
import { UserDto } from '../model/user/userDto';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    this.baseUrl="https://localhost:7042/post";
  }

  getPostsForUser(id: number, numOfPosts: number):Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/all/${id}/${numOfPosts}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
  createPost(post: Post):Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/new`, post,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken()), responseType: 'arraybuffer'});
  }

  likeIt(postId:number,user: string):Observable<Object> {
    console.log(this.tokenService.vratiToken());
    return this.httpClient.post(`${this.baseUrl}/like/${postId}/${user}`, null,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken()), responseType: 'arraybuffer'});
  }

  unliked(postId: number, user:string):Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/unlike/${postId}/${user}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  GetLikesForPost(postId: number, user: string):Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${this.baseUrl}/likes/${postId}/${user}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  GetCommentsForPost(postId: number):Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/comments/${postId}`,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }

  PostComment(com: CommentRequest):Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseUrl}/comment`, com,
    {headers: new HttpHeaders().set('Authorization', this.tokenService.vratiToken())});
  }
}
