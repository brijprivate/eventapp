import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoginPage } from '../login/login.page';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReqResModel } from 'src/app/models/ReqResModel';
import { EnvService } from 'src/app/services/env.service';
import { DataService } from 'src/app/services/DataService';
import { LocationDetails } from 'src/app/models/LocationDetails';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  CountrySelection: LocationDetails[];
  StateSelection: LocationDetails[];
  CitySelection: LocationDetails[];

  registerForm: FormGroup;
 
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
  NumberFromOTP: string;

  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private dataService: DataService,
    private loadingController: LoadingController,
    private env: EnvService,
  ) {
    // redirect to home if already logged in
    // if (this.dataService.currentUserValue) {
    //   this.navCtrl.navigateRoot('/dashboard');
    // }
    this.authService.logout();
    //this.GetCountries();
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      EmailID: new FormControl('', [Validators.required, Validators.email,]),
     FirstName: new FormControl('', [Validators.required,]),
     LastName: new FormControl('', [Validators.required,]),
     DateOfBirth: new FormControl('', [Validators.required,]),
     PhoneNo: new FormControl({value:this.env.PhoneNumber,disabled: true}, [Validators.required]),
     // Address: new FormControl('', [Validators.required,]),
     Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
     // Gender: new FormControl(['1']),
     // State: new FormControl('', [Validators.required,]),
     // Country: new FormControl('', [Validators.required,]),
     // City: new FormControl('', [Validators.required,]),
   });
 
   }

  BackButtonClick() {
    this.modalController.dismiss();
  }
  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
  async register() {
   
    if (this.registerForm.invalid) {
      //console.log(this.registerForm.value);
      return;
  }
  this.registerForm.value['PhoneNo'] = this.env.PhoneNumber;

    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      console.log('form value--->',this.registerForm.value);
      this.authService.register(this.registerForm.value)
        .then(
          async (res: any) => {
            let dataObj = res as ReqResModel;
            console.log(dataObj);
            
            if (dataObj.IsReqResOk) {
              if (dataObj.ReqResReturnObj) {
                loading.dismiss();
                this.dismissRegister();
                this.alertService.success("User Registered Successfully");
                const loginModal = await this.modalController.create({
                  component: LoginPage,
                });
                return await loginModal.present();
              }
              else {
                loading.dismiss();

                this.alertService.warning(dataObj.ReqResReturnMsg);
              }
            }
          })
        .catch(err => {
          loading.dismiss();
          console.log(err);
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
}
