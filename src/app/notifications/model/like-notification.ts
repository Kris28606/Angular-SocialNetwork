import { Post } from "src/app/home/components/post/model/post";
import { UserDto } from "src/app/model/user/userDto";

export class LikeNotification {
    fromWho: UserDto=new UserDto();
    forWhoId: number=0;
    post: Post=new Post();
    date!: Date;
}
