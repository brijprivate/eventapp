import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { ChangePasswordPage } from "../change-password/change-password.page";
import { AuthService } from "src/app/services/auth.service";
import { ReqResModel } from 'src/app/models/ReqResModel';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/DataService';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-forgot-otp',
  templateUrl: './forgot-otp.page.html',
  styleUrls: ['./forgot-otp.page.scss'],
})
export class ForgotOTPPage implements OnInit {


  ForgotPassowrdForm: FormGroup;
  mobileNumber:string;

  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,
    private dataService: DataService,
    private loadingController: LoadingController,
    private alertService: AlertService,
    private authService: AuthService,
    private env: EnvService) { }


  ngOnInit() {
    this.ForgotPassowrdForm = this.formBuilder.group({
      userEmail:(['', [Validators.required]]),
      newPassword: (['', [Validators.required]]),
      confirmPassword: (['', Validators.required]),
    },
      {
        validator: this.MustMatch('newPassword', 'confirmPassword')
      }
    );

  }

  // match passowrd
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

  async ChangePasswordClicked() {
    if (!this.ForgotPassowrdForm.valid) {
      return;
    }
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.forgotPassoword(this.mobileNumber,this.ForgotPassowrdForm.controls["userEmail"].value, this.ForgotPassowrdForm.controls["newPassword"].value)
        .then(
          async (res: boolean) => {
            console.log("response from create contact group -> " + (res));
            if (res) {
              loading.dismiss();
              this.alertService.success("Password Changed Sucessfully");
              this.modalController.dismiss(null);
            }
            else {
              loading.dismiss();
              this.alertService.error("Password Update Failed");
              this.modalController.dismiss(null);
            }
          })
        .catch(err => {
          loading.dismiss();
          console.log(err);
          this.alertService.error("Service End Point Error, Please Check Fields..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

}
