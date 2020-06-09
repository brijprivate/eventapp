export class UserEvents {
      HostingUserID: number;
      
      MemberUserID: number;
      
      EventID: number;

      EventDescription: string;

      TemplateID: number;
      ContactGroupId: number;

      TemplateDescription: string;

      TemplateMessage: string;

      MessagesUsed: number;

      InvitedUserIDs: string;

      InvitedUsers: string;

      DateOfEvent: Date;

      FirstReminder: Date;

      SecondReminder: Date;

      GiftAmount: number;

      HonoredUserFirstName: string;

      HonoredUserLastName: string;

      HonoredUserPhoneNo: string;

      HonoredUserEmailID: string;

      HonoredUserGenderID: number;

      CountryID: number;

      StateID: number;

      CityID: number;

      Address: string;

      constructor(eventID = -1,MemberUserID = -1) {
            this.EventID = eventID;
            this.MemberUserID = MemberUserID;
      }

}