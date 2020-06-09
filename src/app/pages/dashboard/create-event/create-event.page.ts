import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/DataService';
import { AuthService } from 'src/app/services/auth.service';
import { ReqResModel } from 'src/app/models/ReqResModel';
import { EnvService } from 'src/app/services/env.service';
import { LocationDetails } from 'src/app/models/LocationDetails';
import { UserEvents } from 'src/app/models/UserEvents';
import { UserTemplates } from 'src/app/models/UserTemplates';
import { UserContacts } from 'src/app/models/UserContact';
import { MemberDetails } from 'src/app/models/MemberDetails';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  tempEventObj: UserEvents;

  CountrySelection: LocationDetails[];
  StateSelection: LocationDetails[];
  CitySelection: LocationDetails[];
  UserTemplatesList: UserTemplates[] = [];
  UserContactsList: UserContacts[] = [];

  SelectionMemberBoxList: MemberDetails[];
  Fname: string;
  Lname: string;
  EMail: string;
  //today's date
  todaydate = new Date();
  eventForm: FormGroup;

  constructor(private modalController: ModalController,
    private alertService: AlertService,
    private loadingController: LoadingController,
    private dataService: DataService,
    private authService: AuthService,
    private env: EnvService,
    private formBuilder: FormBuilder
  ) {
    // this.SelectionMemberBoxList = new MemberDetails()[];
    this.dataService.currentMemberDetails.subscribe(List => {
      if (List == null || List.length == 0) {
        this.authService.getAllMemberList1().subscribe(
          data => {
            if (data == null || data.length == 0) {
              this.modalController.dismiss(null);
              this.alertService.warning("Please Create Contact Group first on Contact Tab");
            }
            else {
              this.dataService.setMemberDetails(data);
              this.SelectionMemberBoxList = data;
            }
          }), error => {
            console.log(error);
            this.alertService.error("Failed to get member list" + error)
          };
      }
      else {
        this.SelectionMemberBoxList = List;
      }
    });

    this.dataService.userContactsList.subscribe(List => {
      if (List == null || List.length == 0) {
        this.authService.getUserContacts().subscribe(
          data => {
            if (data == null || data.length == 0) {
              this.modalController.dismiss(null);
              this.alertService.warning("Please Create Contact Group first on Contact Tab");
            }
            else {
              this.dataService.SetUserContactsList(data);
            }
          },
          error => {
            this.alertService.error("Failed to get contact list list" + error)
          }
        );
      }
      else {
        this.UserContactsList = List;
      }
    });

    this.dataService.userTemplatesList.subscribe(List => {
      if (List == null || List.length == 0) {
        this.authService.getUserTemplateList().subscribe(
          data => {
            if (data == null || data.length == 0) {
              this.modalController.dismiss(null);
              this.alertService.warning("Please create template first on Template Tab");
            }
            else {
              this.dataService.SetUserTemplateList(data);
            }
          },
          error => {
            this.alertService.error("Failed to get event list" + error)
          });
      }
      else {
        this.UserTemplatesList = List;
      }
    });
    this.GetCountries();
  }

  ngOnInit() {
    if (this.tempEventObj && this.tempEventObj.StateID != undefined || this.tempEventObj.CountryID != undefined) {
      this.GetCities();
      this.GetStates();
    }
    if(this.tempEventObj.MemberUserID != -1)
    {
      this.Fname = this.SelectionMemberBoxList.find(x => x.MemberUserID == this.tempEventObj.MemberUserID).FirstName;
      this.Lname = this.SelectionMemberBoxList.find(x => x.MemberUserID == this.tempEventObj.MemberUserID).LastName;
      this.EMail = this.SelectionMemberBoxList.find(x => x.MemberUserID == this.tempEventObj.MemberUserID).EmailID;
    }
    this.eventForm = this.formBuilder.group({
      MemberUserID: [this.tempEventObj.MemberUserID, [Validators.required]],
      EventID: [this.tempEventObj.EventID, [Validators.required]],
      // HonoredUserEmailID: [this.tempEventObj.HonoredUserEmailID, [Validators.required, Validators.email]],
      // HonoredUserFirstName: [this.tempEventObj.HonoredUserFirstName, [Validators.required]],
      // HonoredUserLastName: [this.tempEventObj.HonoredUserLastName, [Validators.required]],
      DateOfEvent: [this.tempEventObj.DateOfEvent, [Validators.required]],
      // HonoredUserPhoneNo: ["999999999", [Validators.required]],
      eventPlace: [this.tempEventObj.Address, [Validators.required, Validators.maxLength(100)]],
      // HonoredUserGenderID: [this.tempEventObj.HonoredUserGenderID],
      StateID: [this.tempEventObj.StateID, [Validators.required]],
      CountryID: [this.tempEventObj.CountryID, [Validators.required]],
      CityID: [this.tempEventObj.CityID, [Validators.required]],
      TemplateID: [this.tempEventObj.TemplateID, [Validators.required]],
      ContactGroupId: [this.tempEventObj.ContactGroupId, [Validators.required]],
      EventDescription: [this.tempEventObj.EventDescription, [Validators.required]]
    });
  }

  MemberSelectionChanged(event) {
    console.log(event.source.value);
    // this.memberListForm.patchValue(this.SelectionMemberBoxList.find(x => x.MemberUserID == event.source.value));
    this.Fname = this.SelectionMemberBoxList.find(x => x.MemberUserID == event.source.value).FirstName;
    this.Lname = this.SelectionMemberBoxList.find(x => x.MemberUserID == event.source.value).LastName;
    this.EMail = this.SelectionMemberBoxList.find(x => x.MemberUserID == event.source.value).EmailID;
  }

  async getAllMemberList(memberId = -1) {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.getAllMemberList()
        .then(
          async (res: any) => {
            console.log("res found -> " + res.data);
            this.SelectionMemberBoxList = res as MemberDetails[];
            loading.dismiss();
          })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          this.alertService.error("Service End Point Error, Please Check logs..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  async GetStates() {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      //console.log("get country id-->",this.userDetails.CountryID)
      this.authService.GetStates(this.tempEventObj.CountryID)
        .then(
          async (res: any) => {
            console.log("res found -> " + res);
            let dataObj = res as LocationDetails[];
            this.StateSelection = dataObj;
            loading.dismiss();
          })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          this.alertService.error("Service End Point Error, Please Check logs..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  async GetCities() {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      //   console.log('vvvvvvv----->',this.userDetails.StateID)
      this.authService.GetCities(this.tempEventObj.StateID)
        .then(
          async (res: any) => {
            console.log("res found -> " + res);
            let dataObj = res as LocationDetails[];
            this.CitySelection = dataObj;

            loading.dismiss();
          })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          this.alertService.error("Service End Point Error, Please Check logs..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  async GetCountries() {

    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.GetCountries()
        .then(
          async (res: any) => {
            console.log("res found -> " + res.data);
            let dataObj = res as LocationDetails[];
            this.CountrySelection = dataObj;
            loading.dismiss();
          })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          this.alertService.error("Service End Point Error, Please Check logs..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  async countrySelectionChanged(event) {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.GetStates(event.source.value)
        .then(
          async (res: any) => {
            console.log("res found -> " + res);
            let dataObj = res as LocationDetails[];
            this.StateSelection = dataObj;
            loading.dismiss();
          })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          this.alertService.error("Service End Point Error, Please Check logs..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  async StateSelectionChanged(event) {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.GetCities(event.source.value)
        .then(
          async (res: any) => {
            console.log("res found -> " + res);
            let dataObj = res as LocationDetails[];
            this.CitySelection = dataObj;
            loading.dismiss();
          })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          this.alertService.error("Service End Point Error, Please Check logs..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  BackButtonClick() {
    this.modalController.dismiss(null);
  }

  // SaveAndCloseClicked(){
  //   this.modalController.dismiss(this.tempTemplteObj);
  // }

  alphabetsOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;

  }

  async CreateEvent() {
    if (this.eventForm.invalid) {
      //console.log(this.registerForm.value);
      return;
    }
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.AddUpdateUserEvent(this.eventForm.value)
        .then(
          async (res: any) => {
            console.log("response from create event -> " + (res as number));
            loading.dismiss();
            this.alertService.success("Event Created Successfully");
            this.modalController.dismiss(null);
          })
        .catch(err => {
          loading.dismiss();
          console.log("response from create event -> " + err);
          this.alertService.error("Service End Point Error, Please Check Fields..!");
        });
      // .subscribe(
      //   data => {
      //     let dataObj = data as ReqResModel;
      //     if (dataObj.IsReqResOk) {
      //       if (dataObj.ReqResReturnObj) {
      //         this.dismissRegister();
      //         this.dataService.setIsLoggedIn(true);
      //         this.navCtrl.navigateRoot('/dashboard');
      //       }
      //       else {
      //         this.alertService.warning(dataObj.ReqResReturnMsg);
      //       }
      //     }
      //   },
      //   error => {
      //     loading.dismiss();
      //     this.alertService.error("Servie Issue Please Check Log..");
      //   },
      //   () => {
      //     loading.dismiss();
      //   }
      // );
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }
}
