export class LoginData {
    Username:string;
    Password:string;
    /**
     *
     */
    constructor(userName:string,password:string) {
        this.Username = userName;
        this.Password = password;
    }
}