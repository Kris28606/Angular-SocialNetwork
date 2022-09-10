import { Post } from "src/app/home/components/post/model/post";
import { UserDto } from "src/app/model/user/userDto";

export class CommentNotification {
    fromWhoId: number=0;
    fromWhoUsername: String="";
    postId: number=0;
    postPicture: String="";
    fromWhoPicture:String="";
    date!: Date;
    comment: String="";
}
