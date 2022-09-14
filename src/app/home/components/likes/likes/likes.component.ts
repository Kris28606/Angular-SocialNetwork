import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { PostService } from 'src/app/postService/post.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
import { Post } from '../../post/model/post';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  post: Post=new Post();
  users: UserDto[]=[];
  trenutniUser: string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private postService: PostService, private tokenService: TokenService,
  private router: Router, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.trenutniUser=this.tokenService.vratiUsera();
    this.post=this.data;
    this.postService.GetLikesForPost(this.post.postId, this.trenutniUser).subscribe(data=> {
      this.users=data;
    }, error=> {
      console.log(error.message);
    })

  }

  idiNaProfil(user: UserDto) {
    this.router.navigate(['profile', user.id]);
    
  }

  unfollow(user: UserDto) {
    this.userService.Unfollow(this.tokenService.vratiUsera(),user.id).subscribe(()=> {
      user.iFollow=false;
    }, error=> {
      console.log(error.message);
    })
  }

  follow(user: UserDto) {
      this.notificationService.SendRequest(this.tokenService.vratiUsera(),user.id).subscribe(data=> {
         user.requestSent=true;
      }, error=> console.log(error.message));
  }

}
