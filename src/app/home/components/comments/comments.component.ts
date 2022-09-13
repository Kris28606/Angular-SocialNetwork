import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Comment } from 'src/app/model/comment/comment';
import { CommentRequest } from 'src/app/model/comment/comment-request';
import { UserDto } from 'src/app/model/user/userDto';
import { CommentNotification } from 'src/app/notifications/model/comment/comment-notification';
import { PostService } from 'src/app/postService/post.service';
import { SignalRserviceService } from 'src/app/signalR/signal-rservice.service';
import { TokenService } from 'src/app/token/token.service';
import { Post } from '../post/model/post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[]=[];
  post: Post=new Post();
  user: string="";
  comment: CommentRequest=new CommentRequest();
  commentNew: Comment=new Comment();
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private postService: PostService, private tokenService: TokenService,
  private router: Router, private signalR: SignalRserviceService) { }

  ngOnInit(): void {
    this.post=this.data;
    this.user=this.tokenService.vratiUsera();
    this.postService.GetCommentsForPost(this.post.postId).subscribe(data=> {
      this.comments=data;
    }, error => {
      console.log(error.message);
    })
    this.signalR.startConnection();
  }

  postComment() {
    this.comment.postId=this.post.postId;
    this.comment.username=this.tokenService.vratiUsera();
    this.postService.PostComment(this.comment).subscribe(data=> {
      this.commentNew=data;
      this.comments.push(this.commentNew);
      this.comment.commentText="";
      this.post.numberOfComments=this.post.numberOfComments+1;
      var com=new CommentNotification();
      com.comment=this.commentNew.commentText;
      com.fromWhoId=this.commentNew.user.id;
      com.fromWhoPicture=this.commentNew.user.profilePicture;
      com.fromWhoUsername=this.commentNew.user.username;
      com.date=this.commentNew.date;
      com.postId=this.post.postId;
      com.postPicture=this.post.picture;
      this.obavestiServer(com);
    },error=> {
      console.log(error.message);
    });
  }

  idiNaProfil(user: UserDto) {
    this.router.navigate(['profile', user.id]);
    
  }

  async obavestiServer(com: CommentNotification) {
    await this.signalR.hubConnection.invoke("SendCommentNotification", com, this.post.userId)
        .finally(() => {
          console.log("Loading....");
        })
        .catch(error => console.error(error.message));
  }


}
