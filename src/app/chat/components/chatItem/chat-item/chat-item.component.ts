import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/chat/model/message';
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
   
  constructor(private tokenService: TokenService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.ucitajUsera(this.tokenService.vratiUsera()).subscribe(data=> {
      this.trenutniUser=data;

      this.userService.getMessages(this.trenutniUser.id, this.user.id).subscribe(data=> {
        this.messages=data;
      }, error=> {
        console.log(error.message);
      })
    }, error => {
        console.log(error.message);
    });
  }

  for(mess: Message) {
    return mess.fromId==this.trenutniUser.id;
  }

  
}
