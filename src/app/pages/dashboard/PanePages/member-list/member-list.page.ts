import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/DataService';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { MemberDetails } from 'src/app/models/MemberDetails';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.page.html',
  styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit {

  memberListForm: FormGroup;
  isSaveNewChecked = false;
  //console.log('MemberDetails', MemberDetails)
  memberDetails: MemberDetails;
  SelectionMemberBoxList: MemberDetails[];

  constructor(private formBuilder: FormBuilder, private alertService: AlertService,
    private loadingController: LoadingController,
    private dataService: DataService,
    private authService: AuthService,
    private env: EnvService,
    private modalController: ModalController) { }

  ngOnInit() {

    this.memberListForm = this.formBuilder.group({
      EmailID: ['', [Validators.email]],
      PhoneNo: [''],
      UserID: [''],
      MemberUserID: [''],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Relation: [''],
      GenderId: [1, [Validators.required]]
    });

    this.getAllMemberList();
  }

  async getAllMemberList(memberId = -1) {

    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      this.authService.getAllMemberList()
        .then(
          async (res: any) => {
            console.log("res found -> " + res.data);
            this.SelectionMemberBoxList = res as MemberDetails[];
            loading.dismiss();
          })
        .catch(err => {
          console.log(err);
          loading.dismiss();
          this.alertService.error("Service End Point Error, Please Check logs..!");
        });
    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  async saveMemberData() {
    console.log('i am in fun -->');
    if (this.memberListForm.invalid) {
      console.log(this.memberListForm.value);
      return;
    }

    // this.memberDetails.FirstName = this.memberListForm.controls['FirstName'].value;
    // this.memberDetails.LastName = this.memberListForm.controls['LastName'].value;
    // this.memberDetails.EmailID = this.memberListForm.controls['EmailID'].value;
    // // this.memberDetails.PhoneNo = this.memberListForm.controls['PhoneNo'].value;
    // this.memberDetails.genderId = this.memberListForm.controls['Relation'].value;
    // console.log('list -->',this.memberListForm.value);

    if (this.dataService.GetNetworkConnectedStatus()) {
      const loading = await this.loadingController.create({
        message: 'Please Wait..',
      });
      loading.present();
      if (this.isSaveNewChecked) {
        this.memberListForm.value.MemberUserID = -1;
      }
      else if(this.memberListForm.value.MemberUserID == "" || this.memberListForm.value.MemberUserID == -1)
      {
        this.alertService.error("Member not selected,Please Select from Select Member or check as new member");
        loading.dismiss();
        return;
      }
      this.authService.AddUpdateMemberUser(this.memberListForm.value,this.isSaveNewChecked)
        .then(
          async (res: boolean) => {
            if (res) {
              loading.dismiss();
              this.alertService.success("Member Details Saved Successfully");
              this.getAllMemberList();
            }
            else {
              loading.dismiss();
              this.alertService.warning("Member Details Not Saved, Service Error..!");
            }
          })
        .catch(err => {
          loading.dismiss();
          console.log("response from create event -> " + err);
          this.alertService.error("Service End Point Error, Please Check Fields..!");
        });

    }
    else {
      this.alertService.error(this.env.NetworkNotAvailableMsg);
    }
  }

  MemberSelectionChanged(event) {
    console.log(event.source.value);
    this.memberListForm.patchValue(this.SelectionMemberBoxList.find(x => x.MemberUserID == event.source.value));
  }

  BackButtonClick() {
    this.modalController.dismiss();
  }

}


