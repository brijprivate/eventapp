import * as core from "@angular/core";
import { RegisterPage } from "../register/register.page";
import { ModalController, NavController, LoadingController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { AlertService } from "src/app/services/alert.service";
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { OTPPagePage } from '../otppage/otppage.page';
import { ForgotOTPPage} from '../forgot-otp/forgot-otp.page';

import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from 'src/app/services/DataService';
import { EnvService } from 'src/app/services/env.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@core.Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements core.OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    private dataService: DataService,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private alertService: AlertService,
    private env: EnvService
  ) {
    this.authService.logout();
  }

  ngOnInit() { }
  // Dismiss Login Modal

  dismissLogin() {
    this.modalController.dismiss();
  }
  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const OTPModal = await this.modalController.create({
      component: OTPPagePage
    });
    return await OTPModal.present();
  }
  async forgotModal() {
    this.dismissLogin();
    const ForgotOTPModal = await this.modalController.create({
      component: OTPPagePage,
      componentProps: {
        forgotPassword: true
      }
    });
    return await ForgotOTPModal.present();
  }

  

  async login(form: NgForm) {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.login(form.value.email, form.value.password).then(
        (res: any) => {
          console.log('Token Stored22');
          loading.dismiss();
          this.alertService.success("Successfully Login");
          console.log(res);
          this.dismissLogin();
          this.dataService.setIsLoggedIn(true);
          this.navCtrl.navigateRoot('/dashboard');
        },
      ).catch(err => {
        loading.dismiss();
        console.log(err);
        this.alertService.error("Please Check your Username and Password");
      });
      // .subscribe(
      //   data => {
      //     this.alertService.success("Successfully Login"+res);
      //   console.log(res);

      //   },
      //   error => {
      //     console.log(error);
      //     this.alertService.error("Please Check your Username and Password")
      //   },
      //   () => {
      //     this.alertService.warning("Login Ok go to dashboard");
      //     this.dismissLogin();
      //     this.navCtrl.navigateRoot('/dashboard');
      //   }
      // );
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
    // if (form.value.email == "vijay" && form.value.password == "vijay123") {
    //   this.authService.login(form.value.email, form.value.password);
    //   this.dismissLogin();
    //   const toast = await this.toastController.create({
    //     message: 'Successfully Login...',
    //     color:'success',
    //     duration: 2000
    //   });
    //  // toast.present();
    //   this.navCtrl.navigateRoot("/dashboard");
    // }
    // else
    // {
    //   // const alert =  await this.alertController.create({
    //   //   header: 'Alert',
    //   //   subHeader: 'Subtitle',
    //   //   message: 'This is an alert message.',
    //   //   buttons: ['OK']
    //   // });
    //   // await alert.present();
    //   const toast = await this.toastController.create({
    //     message: 'Please Check your Username and Password',
    //     color:'danger',
    //     duration: 2000
    //   });
    //   toast.present();
    // }
  }
}
