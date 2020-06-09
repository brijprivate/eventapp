import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { RegisterPage } from "../register/register.page";
import { AuthService } from "src/app/services/auth.service";
import { ReqResModel } from 'src/app/models/ReqResModel';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/DataService';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';
import { ForgotOTPPage } from '../forgot-otp/forgot-otp.page';

@Component({
  selector: "app-otppage",
  templateUrl: "./otppage.page.html",
  styleUrls: ["./otppage.page.scss"]
})
export class OTPPagePage implements OnInit {
  isenabled: boolean = true;
  forgotPassword: boolean = false;

  mobileNumberControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  constructor(
    private alertService: AlertService,
    private modalController: ModalController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private dataService: DataService,
    private env: EnvService,
  ) { }

  mobileNumber: number;
  otpEnteredByUser: string;
  GeneratedOTP: string;
  isOTPGenerated: boolean;
  timeLeft: number = 30;
  showSelected: boolean;
  interval;

  ngOnInit() {
    this.isOTPGenerated = false;
    this.showSelected = false;
  }


  async submitOtp() {

    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  numbersOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


  async reSendOTP() {
    // if()
    // this.interval = setInterval(() => {
    //   if(this.timeLeft > 0) {
    //     this.timeLeft--;
    //   } else {
    //     this.timeLeft = 30;
    //   }
    // },1000);
    // 
    if (this.dataService.GetNetworkConnectedStatus) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      var text = "";
      var len = 4
      var charset = "0123456789";
      for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

      this.GeneratedOTP = text;
      this.isOTPGenerated = true;
      this.authService.MobileNumberExist(this.mobileNumber, this.GeneratedOTP).subscribe(
        data => {
          let dataObj = data as ReqResModel;
          if (dataObj.IsReqResOk) {
            if (this.forgotPassword as boolean) {
              if (dataObj.ReqResReturnObj as boolean) {
                this.authService.sendSMS(this.mobileNumber, this.GeneratedOTP)
                  .then(
                    async (res: any) => {
                      if (res.status == "success") {
                        loading.dismiss();
                        this.isenabled = false;
                        // this.showSelected = !this.showSelected;
                        this.alertService.success("OTP Sent Successfully to : " + this.mobileNumber);
                      }
                      else {
                        loading.dismiss();
                        this.alertService.error(res.msg);
                      }
                    })
                  .catch(err => {
                    loading.dismiss();
                    this.alertService.error("something went wrong, please try again");
                  });
              }
              else {
                loading.dismiss();
                this.alertService.warning(dataObj.ReqResReturnMsg);
              }
            }
            else {
              if (!dataObj.ReqResReturnObj as boolean) {
                this.authService.sendSMS(this.mobileNumber, this.GeneratedOTP)
                  .then(
                    async (res: any) => {
                      if (res.status == "success") {
                        loading.dismiss();
                        this.isenabled = false;
                        // this.showSelected = !this.showSelected;
                        this.alertService.success("OTP Sent Successfully to : " + this.mobileNumber);
                      }
                      else {
                        loading.dismiss();
                        this.alertService.error(res.msg);
                      }
                    })
                  .catch(err => {
                    loading.dismiss();
                    this.alertService.error("something went wrong, please try again");
                  });
              }
              else {
                loading.dismiss();
                this.alertService.warning(dataObj.ReqResReturnMsg);
              }
            }
          }
          else {
            loading.dismiss();
            this.alertService.error("something went wrong, please try again" + dataObj.ReqResReturnMsg);
          }
          // const toast = await this.toastController.create({
          //   message: "OTP Sent Successfully to : " + this.mobileNumber,
          //   color: "success",
          //   duration: 2000
          // });
          // toast.present();
        },
        error => {
          loading.dismiss();
          this.alertService.error(error);
          //   const toast = await this.toastController.create({
          //   message: "something went wrong please check log",
          //   color: "warning",
          //   duration: 2000
          // });
          // toast.present();
        }
      );
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }


    // .subscribe(
    //   async data => {
    //     const toast = await this.toastController.create({
    //       message: "==>" + this.mobileNumber + data,
    //       color: "danger",
    //       duration: 2000
    //     });
    //     toast.present();
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   async () => {
    //     // this.modalController.dismiss();
    //     // const registerModal = await this.modalController.create({
    //     //   component: RegisterPage
    //     // });
    //     // const OTPModal = await this.modalController.create({
    //     //   component: OTPPagePage
    //     // });
    //     // return await OTPModal.present();
    //   }
    // );
  }



  async SendOTP() {
    // if()
    // this.interval = setInterval(() => {
    //   if(this.timeLeft > 0) {
    //     this.timeLeft--;
    //   } else {
    //     this.timeLeft = 30;
    //   }
    // },1000);
    // 
    if (this.dataService.GetNetworkConnectedStatus) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      var text = "";
      var len = 4
      var charset = "0123456789";
      for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

      this.GeneratedOTP = text;
      this.isOTPGenerated = true;
      this.authService.MobileNumberExist(this.mobileNumber, this.GeneratedOTP).subscribe(
        data => {
          let dataObj = data as ReqResModel;
          if (dataObj.IsReqResOk) {
            if (this.forgotPassword as boolean) {
              if (dataObj.ReqResReturnObj as boolean) {
                this.authService.sendSMS(this.mobileNumber, this.GeneratedOTP)
                  .then(
                    async (res: any) => {
                      if (res.status == "success") {
                        loading.dismiss();
                        this.isenabled = false;
                        this.showSelected = !this.showSelected;

                        this.alertService.success("OTP Sent Successfully to : " + this.mobileNumber);
                      }
                      else {
                        loading.dismiss();
                        this.alertService.error(res.msg);
                      }
                    })
                  .catch(err => {
                    loading.dismiss();
                    this.alertService.error("something went wrong, please try again");
                  });
              }
              else {
                loading.dismiss();
                this.alertService.warning(dataObj.ReqResReturnMsg);
              }
            }
            else {
              if (!dataObj.ReqResReturnObj as boolean) {
                this.authService.sendSMS(this.mobileNumber, this.GeneratedOTP)
                  .then(
                    async (res: any) => {
                      if (res.status == "success") {
                        loading.dismiss();
                        this.isenabled = false;
                        this.showSelected = !this.showSelected;
                        this.alertService.success("OTP Sent Successfully to : " + this.mobileNumber);
                      }
                      else {
                        loading.dismiss();
                        this.alertService.error(res.msg);
                      }
                    })
                  .catch(err => {
                    loading.dismiss();
                    this.alertService.error("something went wrong, please try again");
                  });
              }
              else {
                loading.dismiss();
                this.alertService.warning(dataObj.ReqResReturnMsg);
              }
            }
          }
          else {
            loading.dismiss();
            this.alertService.error("something went wrong, please try again" + dataObj.ReqResReturnMsg);
          }
          // const toast = await this.toastController.create({
          //   message: "OTP Sent Successfully to : " + this.mobileNumber,
          //   color: "success",
          //   duration: 2000
          // });
          // toast.present();
        },
        error => {
          loading.dismiss();
          this.alertService.error(error);
          //   const toast = await this.toastController.create({
          //   message: "something went wrong please check log",
          //   color: "warning",
          //   duration: 2000
          // });
          // toast.present();
        }
      );
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }


    // .subscribe(
    //   async data => {
    //     const toast = await this.toastController.create({
    //       message: "==>" + this.mobileNumber + data,
    //       color: "danger",
    //       duration: 2000
    //     });
    //     toast.present();
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   async () => {
    //     // this.modalController.dismiss();
    //     // const registerModal = await this.modalController.create({
    //     //   component: RegisterPage
    //     // });
    //     // const OTPModal = await this.modalController.create({
    //     //   component: OTPPagePage
    //     // });
    //     // return await OTPModal.present();
    //   }
    // );
  }

  async CheckOTP() {
    if (this.otpEnteredByUser == this.GeneratedOTP) {
      this.alertService.success("OTP verification Successfully Please Register Your Self");
      this.env.PhoneNumber = this.mobileNumber + '';
      this.modalController.dismiss();
      if (this.forgotPassword) {
        const forgotModal = await this.modalController.create({
          component: ForgotOTPPage,
          componentProps: {
            mobileNumber: this.mobileNumber
          }
        });
        return await forgotModal.present();
      }
      else {
        const registerModal = await this.modalController.create({
          component: RegisterPage
        });
        return await registerModal.present();

      }
    } else {
      this.alertService.warning("OTP is Wrong");
    }
  }

}
