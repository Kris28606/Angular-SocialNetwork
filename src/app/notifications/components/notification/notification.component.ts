import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
import { LikeNotification } from '../../model/like-notification';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  kriterijum: string="";
  user: UserDto=new UserDto();
  pretraga: boolean=false;
  users: UserDto[]=[];
  likeNotifications: LikeNotification[]=[];
  constructor(private router: Router, private tokenService: TokenService, private userService: UserService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.user.username=this.tokenService.vratiUsera();
    console.log(this.user.username);
    this.userService.ucitajUsera(this.user.username).subscribe(data=> {
      this.user=data;
      console.log(this.user);

      this.notificationService.GetLikeNotif(this.user.id).subscribe(data=> {
        this.likeNotifications=data;
        console.log(data);
        console.log(this.likeNotifications[0].fromWho.username);
        console.log(this.likeNotifications[0].post.picture);
      }, error=> {
        console.log(error.message);
      });


    });
  }


  idiNaProfil(id: number) {
    this.router.navigate(['profile', id]);
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
