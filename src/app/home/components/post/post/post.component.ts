import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { LikeNotification } from 'src/app/notifications/model/like-notification';
import { PostService } from 'src/app/postService/post.service';
import { SignalRserviceService } from 'src/app/signalR/signal-rservice.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
import Swal from 'sweetalert2';
import { CommentsComponent } from '../../comments/comments.component';
import { LikesComponent } from '../../likes/likes/likes.component';
import { Post } from '../model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post=new Post();
  user: UserDto=new UserDto();
  constructor(private userService: UserService, private tokenService: TokenService,
    private router: Router, private postService: PostService, public dialog: MatDialog,
    private signalR: SignalRserviceService) { }

  ngOnInit(): void {
    this.user.username=this.tokenService.vratiUsera();
    this.userService.ucitajUseraId(this.post.userId, this.user.username).subscribe(data=> {
      this.user=data;
    })
    this.signalR.startConnection();
  }

  idiNaProfil() {
    this.router.navigate(['profile', this.user.id]);
  }

  likeIt() {
    console.log("Like: "+this.post.postId+" "+this.tokenService.vratiUsera());
    this.postService.likeIt(this.post.postId,this.tokenService.vratiUsera()).subscribe(data=> {
      this.post.numberOfLikes=this.post.numberOfLikes+1;
      this.post.iLiked=true;
      if(data.fromWhoUsername==this.tokenService.vratiUsera()) {
        return;
      }
      this.obavestiServera(data);
    }, error => {
      console.log("Greska!");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry. Try again later!'
      });
      console.log(error.message);
    })
  }

  async obavestiServera(data: any) {
    await this.signalR.hubConnection.invoke("SendLikeNotification", data, this.post.userId)
        .finally(() => {
          console.log("Loading....");
        })
        .catch(error => console.error(error.message));
  }

  unLikeIt() {
    this.postService.unliked(this.post.postId, this.tokenService.vratiUsera()).subscribe(data=> {
      this.post.numberOfLikes=this.post.numberOfLikes-1;
      this.post.iLiked=false;
    }, error=> {
      console.log(error.message);
    })
  }

  showLikes() {
    this.dialog.open(LikesComponent, {
      data: this.post
    });
  }

  showComments() {
    this.dialog.open(CommentsComponent, {
      data: this.post
    });
  }
}
