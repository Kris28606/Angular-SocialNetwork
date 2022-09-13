import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import { SignalRserviceService } from 'src/app/signalR/signal-rservice.service';
import { TokenService } from 'src/app/token/token.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user: UserDto=new UserDto();

  constructor(private loginService: LoginService, private tokenService: TokenService, private router: Router, 
    private signalR: SignalRserviceService) { }

  ngOnInit(): void {
    this.signalR.startConnection();
    this.addListenerSuccess();
    this.addListenerFail();
  }

  addListenerFail() {
    this.signalR.hubConnection.on("logInFail", ()=> {
      Swal.fire("Error, wrong username/password!");
    });
  }

  addListenerSuccess() {
    this.signalR.hubConnection.on("logInSuccessful", (data)=> {
      this.user=data;
      if(this.user.token!=null) {
        this.tokenService.postaviToken(this.user.token);
        this.tokenService.postaviUsera(this.user);
      }
      // console.log("Token"+this.tokenService.vratiToken());
      // console.log("User"+this.tokenService.vratiUsera());
      Swal.fire("Welcome, "+this.user.firstName+" "+this.user.lastName+"!");
      this.router.navigate(['home', this.user.id]);
    });
  }

  LogIn() {

    // this.signalR.hubConnection.invoke("LogIn", this.user)
    // .catch(error=> console.log(error.message));

    this.loginService.LogIn(this.user).subscribe( data=> {
      this.user=data;
      if(this.user.token!=null) {
        this.tokenService.postaviToken(this.user.token);
        this.tokenService.postaviUsera(this.user);
      }
      console.log("Token"+this.tokenService.vratiToken());
      console.log("User"+this.tokenService.vratiUsera());
      Swal.fire("Welcome, "+this.user.firstName+" "+this.user.lastName+"!");
      this.router.navigate(['home', this.user.id]);
    }, error => {
      Swal.fire("Error, wrong username/password!");
      console.log(error);
    })
  }
}
