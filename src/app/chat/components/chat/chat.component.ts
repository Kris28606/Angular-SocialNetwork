import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  kriterijum: string="";
  constructor(private router: Router,private userService: UserService, private tokenService: TokenService,
    private messageService: MessageService) { }

  inboxUsers: UserDto[]=[];
  trenutniUser: UserDto=new UserDto();
  prikazi: boolean=false;
  selektovaniUser: UserDto=new UserDto();


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
  }

  goToHomePage() {
    this.router.navigate(['home', this.trenutniUser.id]);
  }

  onChange() {
    
  }

  prikaziPoruke(usr: UserDto, event: any) {
    this.selektovaniUser=usr;
    this.prikazi=true;
    console.log("Desilo se "+this.selektovaniUser.username);
  }
}
