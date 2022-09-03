import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
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
    private router: Router) { }

  ngOnInit(): void {
    this.user.username=this.tokenService.vratiUsera();
    this.userService.ucitajUseraId(this.post.userId).subscribe(data=> {
      this.user=data;
    })
  }

  idiNaProfil() {
    this.router.navigate(['profile', this.user.id]);
  }
}
