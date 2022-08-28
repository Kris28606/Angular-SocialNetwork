import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { PostService } from 'src/app/postService/post.service';
import { UserService } from 'src/app/userService/user.service';
import { Post } from '../post/model/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: number=0;
  user: UserDto=new UserDto();
  posts: Post[]=[];
  constructor(private route: ActivatedRoute, private userService: UserService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.userService.ucitajUsera(this.id).subscribe(data=> {
      this.user=data;
      console.log(this.user);
    });

    this.postService.getPostsForUser(this.id).subscribe(data=> {
      this.posts=data;
      console.log(this.posts);
    }, error => {
      console.log(error.message);
    })
  }

}
