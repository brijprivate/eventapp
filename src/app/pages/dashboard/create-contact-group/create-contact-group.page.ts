import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import {
  Contact,
  ContactField,
  ContactName,
  Contacts,
} from "@ionic-native/contacts";
import { ContactsList, UserContacts } from "src/app/models/UserContact";
import { DataService } from "src/app/services/DataService";
import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { EnvService } from "src/app/services/env.service";
import { ContactpickerPage } from "./../contactpicker/contactpicker.page";

@Component({
  selector: "app-create-contact-group",
  templateUrl: "./create-contact-group.page.html",
  styleUrls: ["./create-contact-group.page.scss"],
})
export class CreateContactGroupPage implements OnInit {
  tempContactObj = new UserContacts();

  constructor(
    private modalController: ModalController,
    private contacts: Contacts,
    private dataService: DataService,
    private loadingController: LoadingController,
    private alertService: AlertService,
    private authService: AuthService,
    private env: EnvService
  ) {}

  ngOnInit() {
    if (this.tempContactObj != null) {
    }
  }

  BackButtonClick() {
    this.modalController.dismiss();
  }

  async openContactPicker() {
    let contactPicker = await this.modalController.create({
      component: ContactpickerPage,
    });
    contactPicker.present();
    const { data } = await contactPicker.onDidDismiss();
  }

  async SaveGroup() {
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: "Please Wait..",
      });
      loading.present();
      this.authService
        .AddUpdateUserContacts(this.tempContactObj)
        .then(async (res: boolean) => {
          console.log("response from create contact group -> " + res);
          if (res) {
            loading.dismiss();
            this.alertService.success("Group Updated Successfully");
          } else {
            loading.dismiss();
            this.alertService.error("Group Update Failed");
          }
        })
        .catch((err) => {
          loading.dismiss();
          console.log(err);
          this.alertService.error(
            "Service End Point Error, Please Check Fields..!"
          );
        });
    } else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  ImportContact() {
    this.openContactPicker();
    // this.contacts.pickContact().then(
    //   async (contact: Contact) => {
    //     this.tempContactObj.ContactList.push(
    //       new ContactsList(contact.displayName, contact.phoneNumbers[0].value)
    //     );
    //     if (this.dataService.GetNetworkConnectedStatus()) {
    //       const loading = await this.loadingController.create({
    //         message: "Please Wait..",
    //       });
    //       loading.present();
    //       this.authService
    //         .AddUpdateUserContacts(this.tempContactObj)
    //         .then(async (res: boolean) => {
    //           console.log("response from create contact group -> " + res);
    //           if (res) {
    //             loading.dismiss();
    //             this.alertService.success("Group Updated Successfully");
    //           } else {
    //             loading.dismiss();
    //             this.alertService.error("Group Update Failed");
    //           }
    //         })
    //         .catch((err) => {
    //           loading.dismiss();
    //           console.log(err);
    //           this.alertService.error(
    //             "Service End Point Error, Please Check Fields..!"
    //           );
    //         });
    //     } else {
    //       this.alertService.error(this.env.NetworkNotAvailableMsg);
    //     }
    //   },
    //   (err) => {
    //     console.log("Error: " + err);
    //   }
    // );
  }

  editContact() {}

  async deleteContact(index: number) {
    this.tempContactObj.ContactList.splice(index, 1);
    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: "Please Wait..",
      });
      loading.present();
      this.authService
        .AddUpdateUserContacts(this.tempContactObj)
        .then(async (res: boolean) => {
          console.log("response from create contact group -> " + res);
          if (res) {
            loading.dismiss();
            this.alertService.success("Group Updated Successfully");
          } else {
            loading.dismiss();
            this.alertService.error("Group Update Failed");
          }
        })
        .catch((err) => {
          loading.dismiss();
          console.log(err);
          this.alertService.error(
            "Service End Point Error, Please Check Fields..!"
          );
        });
    } else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }
}
