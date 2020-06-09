import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { throwError, Observable } from 'rxjs';
import { LoginData } from '../models/LoginData';
import { AlertService } from './alert.service';
import { ReqResModel } from '../models/ReqResModel';
import { UserRegistrationDetails } from '../models/UserRegistrationDetails';
import { UserTemplates } from '../models/UserTemplates';
import { DataService } from './DataService';
import * as jwt_decode from "jwt-decode";
import { LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { UserEvents } from '../models/UserEvents';
import { LocationDetails } from '../models/LocationDetails';
import { UserDetails } from '../models/UserDetails';
import { UserContacts } from '../models/UserContact';
import { MemberDetails } from '../models/MemberDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  token: any;

  //true if want to debug and local service api otherwise false for godday api service www.cdays.in/api/..
  isLocalService = false;
  API_Auth_String: string;
  API_String: string;

  constructor(
    private alertService: AlertService,
    private loadingController: LoadingController,
    private dataService: DataService,
    private http1: HTTP,
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) {
    this.API_Auth_String = this.isLocalService ? this.env.API_Auth_Local_URL : this.env.API_Auth_Gloabl_URL;
    this.API_String = this.isLocalService ? this.env.API_Local_URL : this.env.API_Gloabl_URL;
  }

  login(email: string, password: string) {
    //this.alertService.success("1");
    console.log(email, password);

    //const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' })
    // reqHeader.append('Access-Control-Allow-Origin' , '*');
    // reqHeader.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // reqHeader.append('Accept','application/json');

    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_Auth_String, new LoginData(email, password), {}).then(res => {
        resolve(JSON.parse(res.data));
        this.storage.setItem('token', JSON.parse(res.data))
          .then(
            () => {
              console.log('Token Stored');
              //this.alertService.success('Token Stored');
              let tokenDetails = jwt_decode(JSON.parse(res.data));
              this.dataService.setUserID(tokenDetails.nameid, tokenDetails.unique_name);
              this.dataService.setIsLoggedIn(true);
              console.log('Token Stored11');
              // this.dataService.setUserID(tokenDetails.nameid, tokenDetails.unique_name);
            },
            error => {
              console.error('Error storing token', error);
              this.alertService.error('Error storing item' + error);
            }
          );
      })
        .catch(err => {
          console.error('Error x', err);
          reject(err);
        });
    });

    // .pipe(
    //   tap(token => {
    //     this.alertService.success("token gatten");
    //     this.storage.setItem('token', token)
    //       .then(
    //         () => {
    //           console.log('Token Stored');
    //           this.alertService.success('Token Stored');
    //           let tokenDetails = this.getDecodedAccessToken();
    //           this.dataService.setUserID(tokenDetails.nameid, tokenDetails.unique_name);
    //           this.alertService.success(token+"");
    //         },
    //         error => {
    //           console.error('Error storing item', error);
    //           this.alertService.error('Error storing item' + error);
    //         }
    //       );
    //     this.token = token;
    //     this.isLoggedIn = true;
    //     return token;
    //   },
    //     error => {
    //       this.alertService.success("error in  Login"+error);
    //       return throwError(error);
    //       // console.log(error);
    //       // this.alertService.error('api error->' + error);
    //     }),
    // );
    // this.storage.setItem('token', 'vijay123')
    // this.isLoggedIn = true;
  }

  register(userDetails: UserRegistrationDetails) {
    // const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    console.log(userDetails);

    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_String + 'RegisterUser',
        userDetails,
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
  }



  logout() {
    // const headers = new HttpHeaders({
    //   'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    // });
    // return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    // .pipe(
    //   tap(data => {
    //     this.storage.remove("token");
    //     this.isLoggedIn = false;
    //     delete this.token;
    //     return data;
    //   })
    // )
    this.storage.remove("token");
    this.dataService.setIsLoggedIn(false);
  }

  MobileNumberExist(mobileNumber: number, msg: string): Observable<any> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post(this.API_String + 'MobileNumberExist?number=' + mobileNumber, { headers: reqHeader });
    // data => {
    //   if (!data.reqResReturnObj) {
    //     return this.sendSMS(mobileNumber, msg).subscribe(
    //       data => {
    //         return data;
    //       }
    //     );
    //   }
    //   else {
    //     this.alertService.presentToast(data.reqResReturnMsg);
    //     return throwError("asdasd");
    //   }
    // },
    // error => {
    //   console.log("error", error);
    //   return throwError(error);
    // });
    // this.checkNumberRegisterd(mobileNumber).subscribe(data => {
    //   numberExist = data;
    // },
    //   error => {
    //     console.log("error", error);
    //   });

    // if (numberExist) {
    //   return this.http.get("https://api.textlocal.in/send/?apikey=gLEnr7o9SMQ-aZc1OqHoAr88Q0x6qgeQGsRs5fIsmk&numbers=" + mobileNumber + "&message=Your OTP Is => " + msg).subscribe(
    //     data => {
    //       return data;
    //     },
    //     error => {
    //       console.log("error", error);
    //     }
    //   )
    // }
    // return this.http.post(this.env.API_URL + 'auth/login',
    //   {email: email, password: password}
    // ).pipe(
    //   tap(token => {
    //     this.storage.setItem('token', token)
    //     .then(
    //       () => {
    //         console.log('Token Stored');
    //       },
    //       error => console.error('Error storing item', error)
    //     );
    //     this.token = token;
    //     this.isLoggedIn = true;
    //     return token;
    //   }),
    // );
  }

  sendSMS(mobileNumber: number, msg: string) {
    // &contacts=9511789722,9742949310&msg=CHeck my api msg 
    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.env.SMS_Gateway_API_LogoUtility + "&contacts=" + mobileNumber + "&msg=Your OTP Is => " + msg,
        {},
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
    // const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    // return this.http.get<Observable<any>>(this.env.SMS_Gateway_API_LogoUtility + "&contacts=" + mobileNumber + "&msg=Your OTP Is => " + msg);
    // .pipe(map(data => {
    //   return data;
    // })
    // );
    // ,
    // error => {
    //   console.log("error", error);
    //   this.alertService.presentToast('something went wrong');
    // }
  }

  forgotPassoword(mobileNumber: string, mailId: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_String + 'ForgetUserPassword?userEmail=' + mailId + "&mobileNumber=" + mobileNumber + "&newPassword=" + newPassword,
        {},
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
  }


  getUserDetail() {
    return new Promise((resolve, reject) => {
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer("utf8");
      this.http1.post(this.API_String + 'GetUserDetails?userID=' + this.dataService.getUserID(), "", {})
        .then(res => {
          console.log("res json data ->" + JSON.parse(res.data));
          resolve(JSON.parse(res.data));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  UpdateUserDetails(userEvent: UserDetails) {
    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_String + 'UpdateUserDetails',
        userEvent,
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
  }

  getUserContacts() {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserContacts[]>(this.API_String + 'GetUserContacts?userID=' + this.dataService.getUserID(),
      { headers: reqHeader }
    )
  }

  AddUpdateUserContacts(contactGroup: UserContacts) {
    return new Promise((resolve, reject) => {
      // this.http1.setSSLCertMode('nocheck');
      // this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      // this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      // Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_String + 'AddUpdateUserContacts?userID=' + this.dataService.getUserID(),
        contactGroup,
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
  }

  RemoveContactGroup(groupID: number) {
    return new Promise((resolve, reject) => {
      // this.http1.setSSLCertMode('nocheck');
      // this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      // this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      // Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_String + 'DeleteUserGroup?userID=' + this.dataService.getUserID() + "&groupId=" + groupID,
        {},
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
  }

  getUserTemplateList() {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<UserTemplates[]>(this.API_String + 'GetUserTemplates?userID=' + this.dataService.getUserID(),
      { headers: reqHeader }
    )
  }

  RemoveTemplateById(templateID: string) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<boolean>(this.API_String + 'DeleteUserTemplate?userID=' + this.dataService.getUserID() + '&templateID=' + templateID,
      { headers: reqHeader }
    )
  }

  AddUpdateUserTemplate(templateID: string, templateDescription: string, templateText: string): Observable<number> {
    templateID = (templateID == undefined) ? '0' : templateID
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<number>(this.API_String + 'AddUpdateUserTemplate?userID=' + this.dataService.getUserID() + '&templateID=' + templateID +
      '&templateDescription=' + templateDescription + '&templateText=' + templateText,
      { headers: reqHeader }
    )
  }

  getAllEventListByID() {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    console.log("event list user id = " + this.dataService.getUserID());
    return this.http.post<UserEvents[]>(this.API_String + 'GetUserEvents?userID=' + this.dataService.getUserID(),
      { headers: reqHeader }
    )
  }

  AddUpdateUserEvent(userEvent: UserEvents) {
    userEvent.HostingUserID = this.dataService.getUserID();
    userEvent.TemplateDescription = "testdesc";
    userEvent.TemplateMessage = "testmsg";
    userEvent.MessagesUsed = 0;
    userEvent.InvitedUserIDs = null;
    userEvent.InvitedUsers = "testUsers";
    userEvent.FirstReminder = userEvent.DateOfEvent;
    userEvent.SecondReminder = userEvent.DateOfEvent;
    userEvent.GiftAmount = 0;
    userEvent.Address = "testAdd";
    console.log(userEvent);
    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_String + 'AddUpdateUserEvent',
        userEvent,
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.dataService.setIsLoggedIn(true);

        } else {
          this.dataService.setIsLoggedIn(false);

        }
      },
      error => {
        this.token = null;
        this.dataService.setIsLoggedIn(false);

      }
    );
  }

  getDecodedAccessToken(): any {
    this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          let tokenDetails = jwt_decode(data);
          this.dataService.setUserID(tokenDetails.nameid, tokenDetails.unique_name);
          this.dataService.setIsLoggedIn(true);
          return true;
        } else {
          this.dataService.setIsLoggedIn(false);
          return false;
        }
      },
      error => {
        this.token = null;
        this.dataService.setIsLoggedIn(false);
        return false;
      }
    );
  }

  // Add member list
  AddUpdateMemberUser(memberDetails: MemberDetails,isSaveNewChecked=true) {
    console.log(memberDetails);
    if(isSaveNewChecked)
    {
      memberDetails.MemberUserID = -1;
    }
    memberDetails.UserID = this.dataService.getUserID();
    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('json');
      this.http1.post(this.API_String + 'AddUpdateMemberUser',
        memberDetails,
        {}
      ).then(res => {
        resolve(JSON.parse(res.data));
      })
        .catch(err => {
          reject(err);
        });
    });
  }

  getAllMemberList(memberId = -1) {
    return new Promise((resolve, reject) => {
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer("utf8");
      this.http1.post(this.API_String + 'GetMemberUsers?userID=' + this.dataService.getUserID(), "", {})
        .then(res => {
          resolve(JSON.parse(res.data));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getAllMemberList1() {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<MemberDetails[]>(this.API_String + 'GetMemberUsers?userID=' + this.dataService.getUserID(),
      { headers: reqHeader }
    )
  }


  public getAuthentication(): boolean {
    return this.dataService.getIsLoggedIn();
  }

  public GetCountries() {
    return new Promise((resolve, reject) => {
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer("utf8");
      this.http1.post(this.API_String + 'GetCountries', "", {})
        .then(res => {
          console.log("res json data ->" + JSON.parse(res.data));

          resolve(JSON.parse(res.data));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public GetStates(countryID: number) {
    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('utf8');
      this.http1.post(this.API_String + 'GetStates?countryID=' + countryID, "", {})
        .then(res => {
          resolve(JSON.parse(res.data));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public GetCities(stateId: number) {
    console.log("state id is = " + stateId);
    return new Promise((resolve, reject) => {
      this.http1.setSSLCertMode('nocheck');
      this.http1.setHeader('*', 'Access-Control-Allow-Origin', '*');
      this.http1.setHeader('*', 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      this.http1.setHeader('*', 'Accept', 'application/json');
      this.http1.setHeader('*', 'content-type', 'application/json');
      //Important to set the data serializer or the request gets rejected
      this.http1.setDataSerializer('utf8');
      this.http1.post(this.API_String + 'GetCities?stateID=' + stateId, "", {})
        .then(res => {
          resolve(JSON.parse(res.data));
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

  // checkNumberRegisterd(mobileNumber: number): Observable<any> {
  //   return this.http.post(this.env.API_Gloabl_URL, { mobileNumber }).subscribe(
  //     data => {
  //       return data;
  //     },
  //     error => {
  //       console.log("error", error);
  //     });
  // }
// }