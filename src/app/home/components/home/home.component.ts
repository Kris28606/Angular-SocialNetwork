import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { PostService } from 'src/app/postService/post.service';
import { TokenService } from 'src/app/token/token.service';
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
  kriterijum: string="";
  pretraga: boolean=false;
  users: UserDto[]=[];
  numOfPosts: number=7;
  loadMore: boolean=false;
  newPosts: Post[]=[];
  constructor(private route: ActivatedRoute, private userService: UserService,
    private postService: PostService, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.user.username=this.tokenService.vratiUsera();
    console.log(this.user.username);
    this.userService.ucitajUsera(this.user.username).subscribe(data=> {
      this.user=data;
      console.log(this.user);
        this.postService.getPostsForUser(this.user.id, this.numOfPosts).subscribe(data=> {
        this.posts=data;
        if(this.posts.length==this.numOfPosts) {
          this.loadMore=true;
        }
        console.log(this.posts);
      }, error => {
        console.log(error.message);
      });

    }, error=> {
      console.log(error.message);
    });

    
  }

  loadMoreFunk() {
    this.postService.getPostsForUser(this.user.id, this.numOfPosts+7).subscribe(data=> {
      this.newPosts=data;
      for(let i=0;i<this.newPosts.length;i++) {
        this.posts.push(this.newPosts[i]);
      }
      this.numOfPosts=this.numOfPosts+7;
      if(this.posts.length==this.numOfPosts) {
        this.loadMore=true;
      } else {
        this.loadMore=false;
      }
    }, error => {
      console.log(error.message);
    });
  }

  onChange(event : any){
    if(this.kriterijum=="") {
      this.pretraga=false;
      return;
    };
      this.pretraga=true;
      this.userService.SearchUsers(this.kriterijum.trim(), this.user.id).subscribe(data=> {
       this.users=data;
      console.log("Rezultat: "+data);
      });
  }

  goToHomePage() {
    this.router.navigate(['home', this.user.id]);
  }

  logOut() {
    this.tokenService.logout();
  }
}
