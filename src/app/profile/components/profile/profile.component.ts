import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/home/components/post/model/post';
import { UserDto } from 'src/app/model/user/userDto';
import { UserService } from 'src/app/userService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserDto=new UserDto();
  id: number=0;
  posts: Post[]=[];

  constructor(private userService: UserService, private route: ActivatedRoute) { 
    
    console.log()
  }
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.userService.ucitajUsera(this.id).subscribe(data=> {
      this.user=data;
      console.log(this.user);
    });

    this.userService.GetMyPosts(this.id).subscribe(data=> {
      this.posts=data;
      console.log(this.posts);
    }, error => {
      console.log(error.message);
    })
  }

}
