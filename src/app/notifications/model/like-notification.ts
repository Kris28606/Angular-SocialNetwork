import { Post } from "src/app/home/components/post/model/post";
import { UserDto } from "src/app/model/user/userDto";

export class LikeNotification {
    fromWhoId: number=0;
    fromWhoUsername: String="";
    fromWhoPicture: String="";
    postId: number=0;
    postPicture: String="";
    date!: Date;
}
