import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../model/user/userDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user: UserDto=new UserDto()
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHomePage() {
    this.router.navigate(['home', this.user.id]);
  }
}
