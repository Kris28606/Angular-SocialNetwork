import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { UserDto } from 'src/app/model/user/userDto';
import { SignalRserviceService } from 'src/app/signalR/signal-rservice.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
import { CommentNotification } from '../../model/comment/comment-notification';
import { FollowNotification } from '../../model/follow/follow-notification';
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
  commentNotifications: CommentNotification[]=[];
  followNotifications: FollowNotification[]=[];
  hubConnection!: HubConnection;

  constructor(private router: Router, private tokenService: TokenService, private userService: UserService,
    private notificationService: NotificationService, private signalR: SignalRserviceService) { }

  ngOnInit(): void {
    this.signalR.startConnection();
    this.user.username=this.tokenService.vratiUsera();
    console.log(this.user.username);
    this.userService.ucitajUsera(this.user.username).subscribe(data=> {
      this.user=data;
      console.log(this.user);

      this.notificationService.GetLikeNotif(this.user.id).subscribe(data=> {
        this.likeNotifications=data;

        this.notificationService.GetCommentNotif(this.user.id).subscribe(data=> {
          this.commentNotifications=data;

          this.notificationService.GetFollowNotif(this.user.id).subscribe(data=> {
            this.followNotifications=data;
            
            this.obavestiServer();

          }, error => {
            console.log(error.message);
          })

        }, error=> {
          console.log(error.message);
        })

      }, error=> {
        console.log(error.message);
      });
    });

  }

  async obavestiServer() {
    await this.signalR.hubConnection.invoke("Notifications", this.user)
    .finally(() => {
      console.log("Connected to the notifications");
      this.postaviOsluskivaceLike();
      this.postaviOsluskivaceComment();
      this.postaviOsluskivaceFollow();
    })
    .catch(error => console.error(error.message));
    
  }

  async postaviOsluskivaceLike() {
    console.log("Postavljen listener like: ")
    await this.signalR.hubConnection.on("likeNotification", (data)=> {
      console.log("Proso likw")
      var likes:LikeNotification[]=[];
      likes.push(data);
      for(let like of this.likeNotifications) {
        likes.push(like);
      }
      this.likeNotifications=likes;
      console.log(this.likeNotifications)
    })
  }

  async postaviOsluskivaceComment() {
    console.log("Postavljen listener comment: ")
    await this.signalR.hubConnection.on("commentNotification", (data)=> {
      console.log("Proso comment")
      var comments:CommentNotification[]=[];
      comments.push(data);
      for(let com of this.commentNotifications) {
        comments.push(com);
      }
      this.commentNotifications=comments;
      console.log(this.commentNotifications)
    })
  }

  async postaviOsluskivaceFollow() {
    console.log("Postavljen listener follow: ")
    await this.signalR.hubConnection.on("followNotification", (data)=> {
      console.log("Proso follow")
      var follows:FollowNotification[]=[];
      follows.push(data);
      for(let foll of this.followNotifications) {
        follows.push(foll);
      }
      this.followNotifications=follows;
      console.log(this.followNotifications)
    })
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

  confirmRequest(follow: FollowNotification) {
    this.userService.AddFollower(this.user.id, follow.fromWhoId).subscribe(data=> {
      follow.confirmed=true;
    }, error => {
      console.log(error.message);
    })
  }

  deleteRequest(follow: FollowNotification) {
    this.notificationService.DeleteRequest(follow.fromWhoId, this.user.id).subscribe(data=> {
      var obavestenja=[];
      for(let fol of this.followNotifications) {
        if(fol!=follow) {
          obavestenja.push(fol);
        }
      }
      this.followNotifications=obavestenja;
    })
  }

}
