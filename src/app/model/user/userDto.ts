export class UserDto {
    id: number=0;
    username: string="";
    password: string="";
    firstName: string="";
    lastName: string="";
    email: string="";
    token: string="";
    profilePicture: string="";
    iFollow: boolean=false;
    followingMe: boolean=false;
    requestSent: boolean=false;
}
