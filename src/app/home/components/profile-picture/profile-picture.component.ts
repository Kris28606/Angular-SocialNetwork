import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/model/user/userDto';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  @Input() user: UserDto=new UserDto();
  constructor(private router: Router) {
    
   }

  ngOnInit(): void {
  }

  openProfile() {
    this.router.navigate(['profile', this.user.id]);
  }
}
