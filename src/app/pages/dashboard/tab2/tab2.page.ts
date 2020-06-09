import { Component } from '@angular/core';
import { UserTemplates } from 'src/app/models/UserTemplates';
import { Observable } from 'rxjs';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/DataService';
import { AlertService } from 'src/app/services/alert.service';
import { CreateContactGroupPage } from '../create-contact-group/create-contact-group.page';
import { UserContacts, ContactsList } from 'src/app/models/UserContact';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  UserContactsList: UserContacts[] = [];
  results: Observable<any>[];
  searchTerm: string = '';
  constructor(private modalController: ModalController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private dataService: DataService,
    private toastController: ToastController,
    private alertService: AlertService,
    private env: EnvService,
    private loadingController: LoadingController) {
    this.UpdateList();
  }

  async openCreateContactGroupModel() {
    const CreateContactmodel = await this.modalController.create({
      component: CreateContactGroupPage,
      componentProps: {
        tempContactObj: new UserContacts()
      }
    });
    CreateContactmodel.onDidDismiss().then(
      (data: any) => {
        this.UpdateList();
      },
      error => {
        this.alertService.error("Something Went Wrong...");
      });

    return await CreateContactmodel.present();
  }

  async UpdateList() {
    const loading = await this.loadingController.create({
      message: 'Getting Contact Group List Please Wait..',
    });
    loading.present();
    this.authService.getUserContacts().subscribe(
      data => {
        this.dataService.SetUserContactsList(data);
        this.UserContactsList = data;
        loading.dismiss();
      },
      error => {
        loading.dismiss();
        this.alertService.error("Failed to get contact list list" + error)
      }
    );
  }

  async ShowContactList(UserContactItem: UserContacts) {
    const CreateContactmodel = await this.modalController.create({
      component: CreateContactGroupPage,
      componentProps: {
        tempContactObj: UserContactItem
      }
    });

    CreateContactmodel.onDidDismiss().then(
      (data: any) => {
        this.UpdateList();
      },
      error => {
        this.alertService.error("Something Went Wrong Please Check Log");
      });

    return await CreateContactmodel.present();
  }

  async removeGroup(UserContactItem: UserContacts,i: number) {
    if (this.dataService.GetNetworkConnectedStatus()) {
      let prompt = await this.alertCtrl.create({
        header: 'Do you really want to delete Group?',
        message: UserContactItem.GroupName,
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Delete',
            handler: async data => {
              const loading = await this.loadingController.create({
                message: 'Please Wait..',
              });
              loading.present();
              this.authService.RemoveContactGroup(UserContactItem.GroupId)
                .then(
                  async (res: any) => {
                    this.UserContactsList.splice(innerWidth, 1)
                    console.log("response from remove contact group -> " + (res as number));
                    loading.dismiss();
                    this.alertService.success("Group Removed Successfully");
                  })
                .catch(err => {
                  loading.dismiss();
                  console.log(err);
                  this.alertService.error("Service End Point Error, Please Check Fields..!");
                });
            }
          }
        ]
      });
      prompt.present();
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  searchChanged(e: Event) {
    // Call our service function which returns an Observable
    // this.results = this.UserTemplatesList.filter(x=>x.Description.match(this.searchTerm));
  }
}
