import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/app/model/user/userDto';
import { PictureService } from 'src/app/pictureService/picture.service';
import { PostService } from 'src/app/postService/post.service';
import { UserService } from 'src/app/userService/user.service';
import Swal from 'sweetalert2';
import { Post } from '../../post/model/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  @Input() user: UserDto=new UserDto();
  post: Post=new Post();
  file: any;
  data=new FormData();
  constructor(private postService: PostService, private pictureService: PictureService) { }

  ngOnInit(): void {
  }

  savePost() {
    this.post.userId=this.user.id;
    console.log(this.post);
    this.data.append('file',this.file);
    console.log(this.data);

    this.pictureService.uploadPicture(this.data).subscribe(data=> {
      this.post.picture="https://localhost:7042/"+data.toString();
      console.log("Slika:  "+this.post.picture);
      
      this.postService.createPost(this.post).subscribe(data=> {
      Swal.fire("Successful created post!");
      },error=> {
        console.log(error.message);
      });
    }, error => {
      console.log(error.message);
      return;
    });
  }

  select(event: any) {
    this.file=event.target.files[0];
    console.log(this.file);
  }
}

