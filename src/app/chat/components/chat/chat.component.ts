import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { SignalRserviceService } from 'src/app/signalR/signal-rservice.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
import { Message } from '../../model/message';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  kriterijum: string="";
  constructor(private router: Router,private userService: UserService, private tokenService: TokenService,
    private messageService: MessageService, private signalR: SignalRserviceService) { }

  inboxUsers: UserDto[]=[];
  trenutniUser: UserDto=new UserDto();
  prikazi: boolean=false;
  selektovaniUser: UserDto=new UserDto();
  searchUsers: UserDto[]=[];

  messages: Message[]=[];
  novaPoruka: Message=new Message();
  textZaSlanje: string="";


  ngOnInit(): void {
    this.userService.ucitajUsera(this.tokenService.vratiUsera()).subscribe(data=> {
      this.trenutniUser=data;

      this.messageService.getInboxUsers(this.trenutniUser.id).subscribe(data=> {
        this.inboxUsers=data;
      }, error => {
        console.log(error.message);
      })

    }, error=> {
      console.log(error.message);
    })
    this.signalR.startConnection();
  }

  goToHomePage() {
    this.router.navigate(['home', this.trenutniUser.id]);
  }

  onChange() {
    if(this.kriterijum!="") {
      for(let i=0;i<this.inboxUsers.length;i++) {
        if(this.inboxUsers[i].firstName.includes(this.kriterijum)) {
          this.searchUsers.push(this.inboxUsers[i]);
        }
      }
      this.inboxUsers=this.searchUsers;
    } else {
      this.messageService.getInboxUsers(this.trenutniUser.id).subscribe(data=> {
        this.inboxUsers=data;
      }, error => {
        console.log(error.message);
      })
    }
  }

  prikaziPoruke(usr: UserDto, event: any) {
    this.selektovaniUser=usr;
    this.prikazi=true;
    console.log("Desilo se "+this.selektovaniUser.username);
    this.userService.ucitajUseraId(this.selektovaniUser.id, this.trenutniUser.username).subscribe(data=> {
      this.selektovaniUser=data;
        this.messageService.getMessages(this.trenutniUser.id, this.selektovaniUser.id).subscribe(data=> {
        this.messages=data;
        }, error=> {
          console.log(error.message);
        })
    },error=> {
      console.log(error.message);
    })
    this.obavestiServer();
  }

  logOut() {
    this.tokenService.logout();
  }

  async obavestiServer() {
      await this.signalR.hubConnection.invoke("Chat", this.trenutniUser)
    .finally(() => {
      console.log("Connected to the chat");
    })
    .catch(error => console.error(error.message));
    this.newMessageListener();
    
  }

  async newMessageListener() {
    console.log("Pokrenut je listener")
    await this.signalR.hubConnection.on("receivedMessage", (data) => {
      console.log("Desio se event");
      var novaPoruka=data;
      if(novaPoruka.forId==this.trenutniUser.id && novaPoruka.fromId==this.selektovaniUser.id) {
        this.messages.push(novaPoruka);
      }
    });
  }

  for(mess: Message) {
    return mess.fromId==this.trenutniUser.id;
  }

 posaljiPoruku() {
    if(this.textZaSlanje!="") {
      this.novaPoruka.forId=this.selektovaniUser.id;
      this.novaPoruka.fromId=this.trenutniUser.id;
      this.novaPoruka.messageText=this.textZaSlanje;
      this.messageService.sendMessage(this.novaPoruka). subscribe(data=> {
        this.novaPoruka=data;
        this.messages.push(this.novaPoruka);
        this.obavestiKorisnika();
        this.textZaSlanje="";
      }, error => {
        console.log(error.message);
      });
    }
  }

  async obavestiKorisnika() {
    await this.signalR.hubConnection.invoke("SendMessage", this.novaPoruka)
        .finally(() => {
          console.log("Loading....");
        })
        .catch(error => console.error(error.message));
  }
}
