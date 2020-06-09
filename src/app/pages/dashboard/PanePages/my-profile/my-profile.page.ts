import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetails } from 'src/app/models/UserDetails';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/DataService';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { LocationDetails } from 'src/app/models/LocationDetails';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  profileForm: FormGroup;
  userDetails: UserDetails;

  CountrySelection: LocationDetails[];
  StateSelection: LocationDetails[];
  CitySelection: LocationDetails[];

  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private loadingController: LoadingController,
    private dataService: DataService,
    private authService: AuthService,
    private env: EnvService, ) {this.GetCountries(); this.GetStates(); this.GetCities(); }

  ngOnInit() {
    this.dataService.currentUserDetails.subscribe(userDetails => this.userDetails = userDetails);

    this.profileForm = this.formBuilder.group({
      FirstName: [this.userDetails.FirstName, [Validators.required]],
      LastName: [this.userDetails.LastName, [Validators.required]],
      EmailID: [this.userDetails.EmailID, [Validators.required, Validators.email]],
      Gender: [this.userDetails.GenderID],
      UserID: [this.userDetails.UserID, [Validators.required]],
      PhoneNo: [this.userDetails.PhoneNo, [Validators.required]],
      Address: [this.userDetails.Address, [Validators.required, Validators.maxLength(100)]],
      City: [this.userDetails.CityID, [Validators.required]],
      State: [this.userDetails.StateID, [Validators.required]],
      Country: [this.userDetails.CountryID, [Validators.required]],
      DateOfBirth: [this.userDetails.DateOfBirth, [Validators.required]],
      BalanceMessages: [this.userDetails.BalanceMessages, [Validators.required]],
      UpiId: [this.userDetails.UpiId],
      AccountNo: [this.userDetails.AccountNo],
      ConfirmAccountNo: [this.userDetails.AccountNo],
      IFSCCode: [this.userDetails.IFSCCode],
      UserReferanceCode: [this.userDetails.UserReferanceCode],
      ReferedByReferanceCode: [this.userDetails.ReferedByReferanceCode],
      MarriageDate: [this.userDetails.MarriageDate],
      MemberShipType: [this.userDetails.MemberShipType],
      MembershipExpiry: [this.userDetails.MembershipExpiry]
      
    },
     {
      validator: this.MustMatch('AccountNo', 'ConfirmAccountNo')
  }
    );
    this.profileForm.get('PhoneNo').disable();
    this.profileForm.get('BalanceMessages').disable();
    // this.profileForm.get('DateOfBirth').disable();
    this.profileForm.get('MemberShipType').disable();
    this.profileForm.get('MembershipExpiry').disable();
    
  }

// match ifsc code 
 MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  //this.profileForm.patchValue({ orders: this.filteredOrders[0].id }
//get country
  async GetCountries() {

    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      console.log('userdetail-->',this.userDetails)
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

  async GetStates() {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      console.log("get country id-->",this.userDetails.CountryID)
      let s=1;
      this.authService.GetStates(s)
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
      this.authService.GetCities(this.userDetails.StateID)
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
    this.modalController.dismiss();
  }

  alphabetsOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;

  }

  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;

  }

  async SaveProfileData() {
    if (this.profileForm.invalid) {
      console.log(this.profileForm.value);
      return;
    }

    this.userDetails.FirstName = this.profileForm.controls['FirstName'].value;
    this.userDetails.LastName = this.profileForm.controls['LastName'].value;
    this.userDetails.EmailID = this.profileForm.controls['EmailID'].value;
    this.userDetails.PhoneNo = this.profileForm.controls['PhoneNo'].value;
    this.userDetails.Address = this.profileForm.controls['Address'].value;
    // this.userDetails.City = this.profileForm.controls['City'].value;
    //  this.userDetails.State = this.profileForm.controls['State'].value;
    //  this.userDetails.Country = this.profileForm.controls['Country'].value;
    this.userDetails.DateOfBirth = this.profileForm.controls['DateOfBirth'].value;
    this.userDetails.CityID = this.profileForm.controls['City'].value;
     this.userDetails.StateID = this.profileForm.controls['State'].value;
     this.userDetails.CountryID = this.profileForm.controls['Country'].value;
    this.userDetails.BalanceMessages = this.profileForm.controls['BalanceMessages'].value;
    this.userDetails.UpiId = this.profileForm.controls['UpiId'].value;
    this.userDetails.IFSCCode = this.profileForm.controls['IFSCCode'].value;
    this.userDetails.UserReferanceCode = this.profileForm.controls['UserReferanceCode'].value;
    this.userDetails.ReferedByReferanceCode = this.profileForm.controls['ReferedByReferanceCode'].value;
    this.userDetails.MarriageDate = this.profileForm.controls['MarriageDate'].value;
    this.userDetails.AccountNo = this.profileForm.controls['AccountNo'].value;

  console.log('userdetail-->',this.userDetails)
  
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.UpdateUserDetails(this.userDetails)
        .then(
          async (res: boolean) => {
            if (res) {
              this.dataService.setUserDetails(this.userDetails);
              loading.dismiss();
              this.alertService.success("User Details Saved Successfully");
            }
            else {
              loading.dismiss();
              this.alertService.warning("User Details Not Saved, Service Error..!");
            }
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
