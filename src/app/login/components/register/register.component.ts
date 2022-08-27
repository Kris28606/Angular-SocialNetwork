import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserDto=new UserDto();
  constructor(private registerService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  Register() {

    console.log(this.user);
    if(this.user.email=="" || this.user.firstName=="" || this.user.lastName=="" || this.user.password==""
      || this.user.username=="") {
        console.log("Unesite sve podatke!");
        Swal.fire('Please, fill all the fields!');
      } else{
        this.registerService.Register(this.user).subscribe(data=> {
          Swal.fire('You are successfuly registred!');
          this.router.navigate(['login']);

        }, error => {
          console.log("Greska!"+ error.message);
        });
      }
  }
}
