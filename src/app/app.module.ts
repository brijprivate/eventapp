import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyProfilePage } from './pages/dashboard/PanePages/my-profile/my-profile.page';
import { HelpPage } from './pages/dashboard/PanePages/help/help.page';
import { MemberListPage } from './pages/dashboard/PanePages/member-list/member-list.page';
import { ReferAndEarnPage } from './pages/dashboard/PanePages/refer-and-earn/refer-and-earn.page';
import { SettingsPage } from './pages/dashboard/PanePages/settings/settings.page';
import { ContactUsPage } from './pages/dashboard/PanePages/contact-us/contact-us.page';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { environment } from '../environments/environment';
import { MatButtonModule, MatCheckboxModule,MatNativeDateModule ,MatSelectModule,MatRadioModule,MatInputModule,MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { LoggerModule } from 'ngx-logger';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP } from '@ionic-native/http/ngx'; 
import { Contacts } from '@ionic-native/contacts';
import { RaygunErrorHandler } from './services/app.raygun.setup';

@NgModule({
  declarations: [AppComponent,MyProfilePage,ContactUsPage,HelpPage,ReferAndEarnPage,SettingsPage,MemberListPage],
  entryComponents: [MyProfilePage,ContactUsPage,HelpPage,ReferAndEarnPage,SettingsPage,MemberListPage],
  imports: [
    BrowserModule,FormsModule, ReactiveFormsModule,IonicModule.forRoot(), AppRoutingModule,
    BrowserAnimationsModule,HttpClientModule ,MatMenuModule,
    MatIconModule,
    MatButtonModule, MatCheckboxModule,MatNativeDateModule ,MatSelectModule,MatRadioModule,
    MatInputModule,MatFormFieldModule, MatDatepickerModule,LoggerModule.forRoot(environment.logging)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: RaygunErrorHandler
    },
    NativeStorage,HTTP,
    Contacts,SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
