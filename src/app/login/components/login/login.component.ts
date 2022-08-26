import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { TokenService } from 'src/app/token/token.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User=new User();

  constructor(private loginService: LoginService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  LogIn() {
    this.loginService.LogIn(this.user).subscribe( data=> {
      this.user=data;
      console.log(this.user);
      if(this.user.Token!=null) {
        this.tokenService.postaviToken(this.user.Token);
      }
      Swal.fire("Welcome, "+this.user.FirstName+" "+this.user.LastName+"!");
      this.router.navigate(['home']);
    }, error => {
      Swal.fire("Error, wrong username/password!");
      console.log(error);
    })
  }

}
