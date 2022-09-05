import { UserDto } from "../user/userDto";

export class Comment {
    postId: number=0;
    commentText: string="";
    user: UserDto=new UserDto();
}
