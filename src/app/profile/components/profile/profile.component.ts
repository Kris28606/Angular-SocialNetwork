import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/home/components/post/model/post';
import { UserDto } from 'src/app/model/user/userDto';
import { FollowNotification } from 'src/app/notifications/model/follow/follow-notification';
import { NotificationService } from 'src/app/notifications/service/notification.service';
import { PictureService } from 'src/app/pictureService/picture.service';
import { SignalRserviceService } from 'src/app/signalR/signal-rservice.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserDto=new UserDto();
  posts: Post[]=[];
  izmena: boolean=false;
  kriterijum: string="";
  file: any;
  data=new FormData();
  userId: number=0;
  mojProfil=false;
  pretraga=false;
  users: UserDto[]=[];
  username: string="";


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
    private pictureService: PictureService, private tokenService: TokenService, private notificationService: NotificationService,
    private signalR: SignalRserviceService) { 
    
  }
  ngOnInit(): void {
    this.username=this.tokenService.vratiUsera();
    this.userId=this.route.snapshot.params['id'];
    this.userService.ucitajUseraId(this.userId,this.username).subscribe(data=> {
      this.user=data;
      if(this.user.username==this.tokenService.vratiUsera()) {
        this.mojProfil=true;
      } else {
        this.mojProfil=false;
      }
      this.userService.GetMyPosts(this.user.id).subscribe(data=> {
      this.posts=data;
      }, error => {
        console.log(error.message);
      })
    });
  }


  onChange(event : any){
    if(this.kriterijum=="") {
      this.pretraga=false;
      return;
    };
      this.pretraga=true;
      ///// MORA IZMENA
      this.userService.SearchUsers(this.kriterijum.trim(), this.user.id).subscribe(data=> {
       this.users=data;
      console.log("Rezultat: "+data);
      });
  }

  changePicture(evt: any) {
    if(!this.izmena) {
      this.izmena=!this.izmena;
    }else {
      if(this.file==undefined) {
        this.izmena=!this.izmena;
        return;
      };
      this.data.append('file',this.file);
      this.pictureService.uploadPicture(this.data).subscribe(data=> {
          this.user.profilePicture="https://localhost:7042/"+data.toString();
          this.user.token=" ";
          this.userService.changeProfilePicture(this.user).subscribe(data=> {
            console.log("Uspesno");
            for(let p of this.posts){
              p.userId=this.user.id;
            }
          },error => {
            console.log(error.message);
          })
      },error => {
        console.log(error.message);
      });
    }
  }

  goToHomePage() {
    this.router.navigate(['home', this.user.id]);
  }

  select(env: any) {
    this.file=env.target.files[0];
    console.log(this.file);
  }

  logOut() {
    this.tokenService.logout();
  }

  unfollow() {
   this.userService.Unfollow(this.username,this.user.id).subscribe(data=> {
    this.user.iFollow=false;
   }, error=> {
    console.log(error.message);
   });
  }

  follow() {
    this.notificationService.SendRequest(this.username, this.user.id).subscribe(data=> {
      //treba da se promeni dugme
      var follow=data;
      this.obavestiServer(follow);
    }, error=> {
      console.log(error.message);
     });
  }

  async obavestiServer(not: FollowNotification) {
    await this.signalR.hubConnection.invoke("SendFollowNotification", not, this.user.id)
        .finally(() => {
          console.log("Loading....");
        })
        .catch(error => console.error(error.message));
  }
}
