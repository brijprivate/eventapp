import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/DataService';
import { ReqResModel } from 'src/app/models/ReqResModel';
import { AlertService } from 'src/app/services/alert.service';
import { UserDetails } from 'src/app/models/UserDetails';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  user: User;

  constructor(private menu: MenuController, 
    private authService: AuthService, 
    private dataService: DataService,
    private loadingController: LoadingController,
    private alertService:AlertService
    ) {
    this.menu.enable(true);
  }
  ngOnInit() {

  }

  async ionViewWillEnter() {
    if (this.dataService.GetNetworkConnectedStatus) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      await loading.present();
      this.authService.getUserDetail()
      .then(
        async (res: UserDetails) => {
          this.dataService.setUserDetails(res);
          loading.dismiss();
        })
      .catch(err => {
        loading.dismiss();
        console.log("response from get user Detail Event -> "+err);
        this.alertService.error("Service End Point Error, Please Check Fields..!");
      });
    }
  }
}
