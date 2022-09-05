import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { PostService } from 'src/app/postService/post.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
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
    private router: Router, private postService: PostService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user.username=this.tokenService.vratiUsera();
    this.userService.ucitajUseraId(this.post.userId).subscribe(data=> {
      this.user=data;
    })
  }

  idiNaProfil() {
    this.router.navigate(['profile', this.user.id]);
  }

  likeIt() {
    console.log("Like: "+this.post.postId+" "+this.tokenService.vratiUsera());
    this.postService.likeIt(this.post.postId,this.tokenService.vratiUsera()).subscribe(data=> {
      this.post.numberOfLikes=this.post.numberOfLikes+1;
      this.post.iLiked=true;
    }, error => {
      console.log("Greska!");
      console.log(error.message);
    })
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
    
  }
}
