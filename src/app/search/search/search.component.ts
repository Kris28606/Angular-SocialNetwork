import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() user: UserDto=new UserDto();
  ulogovani: number=0;
  constructor(private tokenService: TokenService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  zaprati() {
    this.userService.Follow(this.tokenService.vratiUsera(), this.user.id);
  }

  idiNaProfil() {
    this.router.navigate(['profile', this.user.id]);
  }

  otprati() {
    this.userService.Unfollow(this.tokenService.vratiUsera(),this.user.id).subscribe(data=> {
      this.user.iFollow=false;
    }, error=> {
      console.log(error.message);
    });
  }
}
