import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() user: UserDto=new UserDto();
  ulogovani: number=0;
  constructor(private tokenService: TokenService, private router: Router, private userService: UserService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  zaprati() {
    this.notificationService.SendRequest(this.tokenService.vratiUsera(), this.user.id).subscribe(data=> {
      this.user.requestSent=true;
    }, error=> {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry, we can’t send your request!'
      });
      console.log(error.message);
    });
  }

  idiNaProfil() {
    this.router.navigate(['profile', this.user.id]);
  }

  otprati() {
    this.userService.Unfollow(this.tokenService.vratiUsera(),this.user.id).subscribe(data=> {
      this.user.iFollow=false;
      this.user.requestSent=false;
    }, error=> {
      console.log(error.message);
    });
  }
}
