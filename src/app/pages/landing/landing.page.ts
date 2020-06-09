import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../auth/login/login.page';
import { RegisterPage } from '../auth/register/register.page';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { OTPPagePage } from '../auth/otppage/otppage.page';
import { DataService } from 'src/app/services/DataService';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
    private dataService : DataService
  ) {
    this.menu.enable(false);
  }
  ionViewWillEnter() {
    // this.authService.getDecodedAccessToken().then(() => {
    //   if(this.authService.isLoggedIn) { 
    //     this.navCtrl.navigateRoot('/dashboard');
    //   }
    // });
    this.authService.getDecodedAccessToken();

    if (this.dataService.getIsLoggedIn()) {
      this.navCtrl.navigateRoot('/dashboard');
    }
  }
  ngOnInit() {
  }
  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    const OTPModal = await this.modalController.create({
      component: OTPPagePage
    });
    return await OTPModal.present();
  }

  async login() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
}

