import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/home/components/post/model/post';
import { UserDto } from 'src/app/model/user/userDto';
import { PictureService } from 'src/app/pictureService/picture.service';
import { TokenService } from 'src/app/token/token.service';
import { UserService } from 'src/app/userService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserDto=new UserDto();
  posts: Post[]=[];
  izmena: boolean=false;
  kriterijum: string="";
  file: any;
  data=new FormData();


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
    private pictureService: PictureService, private tokenService: TokenService) { 
    
  }
  ngOnInit(): void {
    this.user.username=this.tokenService.vratiUsera();
    this.userService.ucitajUsera(this.user.username).subscribe(data=> {
      this.user=data;
      console.log("Home: "+this.user.firstName);
      console.log("IDDDDDDDD: "+this.user.id);
      this.userService.GetMyPosts(this.user.id).subscribe(data=> {
      this.posts=data;
      }, error => {
        console.log(error.message);
      })
    });

    
    
  }

  changePicture(evt: any) {
    if(!this.izmena) {
      this.izmena=!this.izmena;
    }else {
      if(this.file==undefined) {
        this.izmena=!this.izmena;
        return;
      };
      this.data.append('file',this.file);
      this.pictureService.uploadPicture(this.data).subscribe(data=> {
          this.user.profilePicture="https://localhost:7042/"+data.toString();
          this.user.token=" ";
          this.userService.changeProfilePicture(this.user).subscribe(data=> {
            console.log("Uspesno");
            for(let p of this.posts){
              p.userId=this.user.id;
            }
          },error => {
            console.log(error.message);
          })
      },error => {
        console.log(error.message);
      });
    }
  }

  onChange(){
    if(this.kriterijum=="") {
      return;
    }
    this.userService.SearchUsers(this.kriterijum.trim()).subscribe(data=> {
      console.log("Rezultat: "+data);
    })
  }

  goToHomePage() {
    this.router.navigate(['home', this.user.id]);
  }

  select(env: any) {
    this.file=env.target.files[0];
    console.log(this.file);
  }

}
