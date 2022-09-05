import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from 'src/app/model/user/userDto';
import { PostService } from 'src/app/postService/post.service';
import { TokenService } from 'src/app/token/token.service';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private postService: PostService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.trenutniUser=this.tokenService.vratiUsera();
    this.post=this.data;
    this.postService.GetLikesForPost(this.post.postId, this.trenutniUser).subscribe(data=> {
      this.users=data;
    }, error=> {
      console.log(error.message);
    })

  }

}
