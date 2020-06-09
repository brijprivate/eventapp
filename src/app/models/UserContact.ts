export class UserContact {
    GroupId:number;
    ContactName:string;
    ContactNumber:string;
    GroupName:string;
}

export class UserContacts
{
    GroupId:number;
    GroupName:string;
    ContactList:ContactsList[];

    constructor() {
        this.GroupId = -1;
        this.GroupName = "";
        this.ContactList = Array<ContactsList>();
    }
}

export class ContactsList
{
    Name:string;
    Number:string;
    constructor(name:string, number:string)
    {
        this.Name = name;
        this.Number = number;
    }

}