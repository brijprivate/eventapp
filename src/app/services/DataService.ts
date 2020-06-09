import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegistrationDetails } from '../models/UserRegistrationDetails';
import { UserTemplates } from '../models/UserTemplates';
import { UserEvents } from '../models/UserEvents';
import { UserDetails } from '../models/UserDetails';
import { ContactsList, UserContact, UserContacts } from '../models/UserContact';
import { MemberDetails } from '../models/MemberDetails';

@Injectable({ providedIn: 'root' })
export class DataService {

    private UserID = new BehaviorSubject<number>(0);
    userID = this.UserID.asObservable();

    private UserDetails = new BehaviorSubject<UserDetails>(null);
    currentUserDetails = this.UserDetails.asObservable();
    
    private MemberDetails = new BehaviorSubject<MemberDetails[]>(null);
    currentMemberDetails = this.MemberDetails.asObservable();

    private UserName = new BehaviorSubject<string>("");
    currentUserName = this.UserName.asObservable();

    private IsLoggedIn = new BehaviorSubject<boolean>(false);
    currentIsLoggedIn = this.IsLoggedIn.asObservable();

    private EmailID = new BehaviorSubject<string>("");
    currentEmailID = this.EmailID.asObservable();

    private IsNetworkConnected = new BehaviorSubject<boolean>(false);
    isNetworkConnected = this.IsNetworkConnected.asObservable();

    private PhoneNumber = new BehaviorSubject<string>("");
    phoneNumber = this.PhoneNumber.asObservable();

    private UserTemplatesList = new BehaviorSubject<UserTemplates[]>(null);
    userTemplatesList = this.UserTemplatesList.asObservable();

    private UserContactsList = new BehaviorSubject<UserContacts[]>(null);
    userContactsList = this.UserContactsList.asObservable();

    private UserEventList = new BehaviorSubject<UserEvents[]>(null);
    userEventList = this.UserEventList.asObservable();
    

    constructor() {
        // this.currentUserDetails.subscribe(Details => {
        //     this.UserName.next("Details.FirstName");
        //     this.EmailID.next("Details.EmailID")
        // });
        // Details.FirstName==null||Details.FirstName==undefined?"":Details.FirstName
    }

    public setUserDetails(userDetails: UserDetails) {
        this.UserDetails.next(userDetails);
    }

    public getUserDetails(): UserDetails {
        return this.UserDetails.value;
    }

    public setMemberDetails(memberDetails: MemberDetails[]) {
        this.MemberDetails.next(memberDetails);
    }

    public getMemberDetails(): MemberDetails[] {
        return this.MemberDetails.value;
    }
    public SetNetworkConnectedStatus(isConnected: boolean) {
        this.IsNetworkConnected.next(isConnected);
    }

    public GetNetworkConnectedStatus(): boolean {
        return this.IsNetworkConnected.value;
    }

    public getUserID(): number {
        return this.UserID.value;
    }

    public setUserID(userId: number, userName: string) {
        this.UserID.next(userId);
        this.UserName.next(userName);
    }

    public getIsLoggedIn(): boolean {
        return this.IsLoggedIn.value;
    }

    public setIsLoggedIn(isLoggedIn:boolean) {
        this.IsLoggedIn.next(isLoggedIn);
    }

    changePhoneNo(No: string) {
        this.PhoneNumber.next(No);
    }

    public SetUserTemplateList(UserTemplates: UserTemplates[]) {
        this.UserTemplatesList.next(UserTemplates);
    }

    public GetUserTemplateList(): UserTemplates[] {
        return this.UserTemplatesList.value;
    }

    public SetUserContactsList(UserContacts: UserContacts[]) {
        this.UserContactsList.next(UserContacts);
    }

    public GetUserContactsList(): UserContacts[] {
        return this.UserContactsList.value;
    }
    

    public SetUserEventList(UserEvents: UserEvents[]) {
        this.UserEventList.next(UserEvents);
    }

    public GetUserEventList(): UserEvents[] {
        return this.UserEventList.value;
    }
}