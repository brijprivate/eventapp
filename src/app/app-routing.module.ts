import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { Contacts } from '@ionic-native/contacts';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' , canActivate: [AuthGuard]},
  { path: 'otppage', loadChildren: './pages/auth/otppage/otppage.module#OTPPagePageModule' },
  { path: 'create-event', loadChildren: './pages/dashboard/create-event/create-event.module#CreateEventPageModule' },
  { path: 'create-contact-group', loadChildren: './pages/dashboard/create-contact-group/create-contact-group.module#CreateContactGroupPageModule' },
  { path: 'create-template', loadChildren: './pages/dashboard/create-template/create-template.module#CreateTemplatePageModule' },
  { path: 'my-profile', loadChildren: './pages/dashboard/PanePages/my-profile/my-profile.module#MyProfilePageModule' },
  { path: 'settings', loadChildren: './pages/dashboard/PanePages/settings/settings.module#SettingsPageModule' },
  { path: 'help', loadChildren: './pages/dashboard/PanePages/help/help.module#HelpPageModule' },
  { path: 'contact-us', loadChildren: './pages/dashboard/PanePages/contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'get-messages', loadChildren: './pages/dashboard/get-messages/get-messages.module#GetMessagesPageModule' },
  { path: 'refer-and-earn', loadChildren: './pages/dashboard/PanePages/refer-and-earn/refer-and-earn.module#ReferAndEarnPageModule' },
  { path: 'forgot-otp', loadChildren: './pages/auth/forgot-otp/forgot-otp.module#ForgotOTPPageModule' },
  { path: 'change-password', loadChildren: './pages/auth/change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'member-list', loadChildren: './pages/dashboard/PanePages/member-list/member-list.module#MemberListPageModule' },
  { path: 'contactpicker', loadChildren: './pages/dashboard/contactpicker/contactpicker.module#ContactpickerPageModule' },



  // { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  // { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,ReactiveFormsModule
  ],
  providers: [
    Network,
    Contacts
 ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
