export class UserRegistrationDetails {
    UserID: number;
    Password: string;
    FirstName: string;
    LastName: string;
    EmailID: string;
    PhoneNo: string;
    DateOfBirth: string;
    Address: string;
    Area : string;
    City : string;
    State: string;
    Country: string;
    Gender: string; 
    
    constructor(userID: number,
        password: string,
        firstName: string,
        lastName: string,
        emailID: string,
        phoneNo: string,
        dateOfBirth: string) {
        this.UserID = userID;
        this.Password = password;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.EmailID = emailID;
        this.PhoneNo = phoneNo;
        this.DateOfBirth = dateOfBirth;
    }
}

