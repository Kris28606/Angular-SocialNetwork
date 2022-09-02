import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/chat/model/message';
import { MessageService } from 'src/app/chat/service/message.service';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {

  messages: Message[]=[];
  @Input() user: UserDto=new UserDto();
  trenutniUser: UserDto=new UserDto();
  novaPoruka: Message=new Message();
  textZaSlanje: string="";
   
  constructor(private tokenService: TokenService, private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.userService.ucitajUsera(this.tokenService.vratiUsera()).subscribe(data=> {
      this.trenutniUser=data;

      this.userService.ucitajUseraId(this.user.id).subscribe(data=> {
        this.user=data;
          this.messageService.getMessages(this.trenutniUser.id, this.user.id).subscribe(data=> {
          this.messages=data;
          }, error=> {
            console.log(error.message);
          })
      },error=> {
        console.log(error.message);
      })
    }, error => {
        console.log(error.message);
    });
  }

  for(mess: Message) {
    return mess.fromId==this.trenutniUser.id;
  }

  posaljiPoruku() {
    if(this.textZaSlanje!="") {
      this.novaPoruka.forId=this.user.id;
      this.novaPoruka.fromId=this.trenutniUser.id;
      this.novaPoruka.messageText=this.textZaSlanje;
      this.messageService.sendMessage(this.novaPoruka). subscribe(data=> {
        this.novaPoruka=data;
        this.messages.push(this.novaPoruka);
        this.textZaSlanje="";
      }, error => {
        console.log(error.message);
      });
    }
  }
}
