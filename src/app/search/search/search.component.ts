import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/app/model/user/userDto';
import { TokenService } from 'src/app/token/token.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() user: UserDto=new UserDto();
  ulogovani: number=0;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  posaljiZahtev() {
    console.log(this.ulogovani);
  }
}
