import { Component } from "@angular/core";

import { Platform, NavController, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { MyProfilePage } from './pages/dashboard/PanePages/my-profile/my-profile.page';
import { ReferAndEarnPage } from './pages/dashboard/PanePages/refer-and-earn/refer-and-earn.page';
import { SettingsPage } from './pages/dashboard/PanePages/settings/settings.page';
import { HelpPage } from './pages/dashboard/PanePages/help/help.page';
import { ContactUsPage } from './pages/dashboard/PanePages/contact-us/contact-us.page';
import { MemberListPage } from './pages/dashboard/PanePages/member-list/member-list.page';
import { DataService } from './services/DataService';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Network } from '@ionic-native/network/ngx';
import { UserRegistrationDetails } from './models/UserRegistrationDetails';
import { timer } from 'rxjs';
import * as rg4js from 'raygun4js';
import { NavigationError, Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/dashboard",
      icon: "home"
    },
    {
      title: "My Profile",
      url: "/home",
      icon: "contact"
    },
    {
      title: "Member list",
      url: "/list",
      icon: "contact"
    },
    {
      title: "Refer & Earn",
      url: "/home",
      icon: "contact"
    },
    {
      title: "Settings",
      url: "/list",
      icon: "settings"
    },
    {
      title: "Help",
      url: "/list",
      icon: "help-circle-outline"
    },
    {
      title: "Contact Us",
      url: "/list",
      icon: "contacts"
    }
  ];

  UserName : string;
  EmailID : string;
  showSplash = true; // <-- show animation

  constructor(
    private platform: Platform,
    // private androidPermissions: AndroidPermissions,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private dataService: DataService,
    private modalController: ModalController,
    private network: Network,
    private router: Router
  ) {
    this.initializeApp();

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
    // );

    // this.androidPermissions.requestPermissions([
    //   this.androidPermissions.PERMISSION.INTERNET,
    //   this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE,
    //   this.androidPermissions.PERMISSION.ACCESS_WIFI_STATE]);

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        // Track navigation error
        rg4js('send', {
          error: event.error
        });
      }
    });
    
    this.dataService.currentUserName.subscribe(username =>  this.UserName = username);
      this.dataService.currentEmailID.subscribe(emailid => this.EmailID = emailid);
      
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.dataService.SetNetworkConnectedStatus(false);
      console.log('network was disconnected :-(');
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.dataService.SetNetworkConnectedStatus(true);
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#77BAEA");
      this.splashScreen.hide();  // <-- hide static image
      this.statusBar.styleDefault();
      this.authService.getDecodedAccessToken();
      timer(9000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }
  // When Logout Button is pressed
  logout() {

    this.authService.logout();
    // .subscribe(
    //   data => {
    //     this.alertService.presentToast(data["message"]);
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   () => {
    //     this.navCtrl.navigateRoot("/landing");
    //   }
    // );
    this.navCtrl.navigateRoot("/landing");
  }

  async MenuClick(indexClick: number) {
    var as = indexClick;
    console.log(as);

    switch (indexClick) {
      case 1: {
        const Modal = await this.modalController.create({
          component: MyProfilePage
        });
        return await Modal.present();
      }
      case 2: {
        const Modal = await this.modalController.create({
          component: MemberListPage
        });
        return await Modal.present();
      }
      case 3: {
        const Modal = await this.modalController.create({
          component: ReferAndEarnPage
        });
        return await Modal.present();
      }
      case 4: {
        const Modal = await this.modalController.create({
          component: SettingsPage
        });
        return await Modal.present();
      }
      case 5: {
        const Modal = await this.modalController.create({
          component: HelpPage
        });
        return await Modal.present();
      }
      case 6: {
        const Modal = await this.modalController.create({
          component: ContactUsPage
        });
        return await Modal.present();
      }

      
    }
  }
}
