import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LandingPage } from './landing.page';
import { LoginPage } from '../auth/login/login.page';
import { RegisterPage } from '../auth/register/register.page';
import { OTPPagePage } from '../auth/otppage/otppage.page';
import { DashboardPage } from '../dashboard/dashboard.page';
import { MyProfilePage } from '../dashboard/PanePages/my-profile/my-profile.page';
import { MatButtonModule, MatIconModule,MatCheckboxModule,MatNativeDateModule ,MatSelectModule,MatRadioModule,MatInputModule,MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { ForgotOTPPageModule } from '../auth/forgot-otp/forgot-otp.module';
import { ChangePasswordPage } from '../auth/change-password/change-password.page';
import { ForgotOTPPage } from '../auth/forgot-otp/forgot-otp.page';


const routes: Routes = [
  {
    path: '',
    component: LandingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    RouterModule.forChild(routes),MatInputModule,MatIconModule,MatFormFieldModule,MatRadioModule, MatDatepickerModule,MatSelectModule,MatNativeDateModule
  ],
  declarations: [LandingPage, LoginPage, RegisterPage,OTPPagePage,ChangePasswordPage,ForgotOTPPage],
  entryComponents: [LoginPage, RegisterPage,OTPPagePage,ChangePasswordPage,ForgotOTPPage]
})
export class LandingPageModule {}
