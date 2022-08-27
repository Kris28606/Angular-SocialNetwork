import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserDto=new UserDto();

  constructor(private tokenService: TokenService) { 
    
    console.log()
  }
  

  ngOnInit(): void {
  }

}
