export class User{
    constructor(
      public  _id: string,
      public username:string,
      public  email: string,
      public  password: string,
      public contactNumber: number,
      public  confirmPassword: string,
      public  profileImage:string
    ){}
}