import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import {
  Contact,
  ContactField,
  ContactName,
  Contacts,
  ContactFindOptions,
} from "@ionic-native/contacts";
import { _MatMenuBase } from "@angular/material";

@Component({
  selector: "app-contactpicker",
  templateUrl: "./contactpicker.page.html",
  styleUrls: ["./contactpicker.page.scss"],
})
export class ContactpickerPage implements OnInit {
  public contactList: any = [];
  public showcontacts: any = [];
  public search_string: String;

  constructor(public modalCtrl: ModalController, public contacts: Contacts) {}

  onInput($event) {
    let _base = this;
    if (_base.search_string != null && _base.search_string.length != 0) {
      this.showcontacts = this.contactList.filter(function (contact) {
        if (
          contact.name.toLowerCase().includes(_base.search_string.toLowerCase())
        ) {
          return contact;
        } else if (
          contact.phone
            .toLowerCase()
            .includes(_base.search_string.toLowerCase())
        ) {
          return contact;
        }
      });
    } else {
      this.showcontacts = this.contactList;
    }
  }

  onCancel($event) {
    this.showcontacts = this.contactList;
  }

  ngOnInit() {
    let _base = this;
    // this.contacts
    //   .find(["displayName", "phoneNumbers"], {
    //     multiple: true,
    //     hasPhoneNumber: true,
    //   })
    //   .then((contacts) => {
    //     for (var i = 0; i < contacts.length; i++) {
    //       if (contacts[i].displayName !== null) {
    //         var contact = {};
    //         contact["name"] = contacts[i].displayName;
    //         contact["number"] = contacts[i].phoneNumbers[0].value;
    //         _base.contactList.push(contact);
    //       }
    //       if (i == contacts.length - 1) {
    //         _base.showcontacts = _base.contactList.map(function(contact){
    //           contact.select = false;
    //           return contact;
    //         });
    //       }
    //     }
    //   });
  }

  choosecontact(contact){
    let _base = this;
    _base.contactList = _base.contactList.map(function(element){
         if(element.name == contact.name && element.phone == contact.phone){
            contact.select = !contact.select;
            return contact;
         }else{
           return contact;
         }
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
