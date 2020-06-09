import { Component } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { CreateTemplatePage } from '../create-template/create-template.page';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/DataService';
import { UserTemplates } from 'src/app/models/UserTemplates';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  UserTemplatesList: UserTemplates[] = [];
  results: Observable<any>[];
  searchTerm: string = '';
  // type: SearchType = SearchType.all;

  constructor(private modalController: ModalController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private dataService: DataService,
    private toastController: ToastController,
    private alertService: AlertService) {
    this.UpdateList();
  }

  ngOnInit() {
    this.dataService.userTemplatesList.subscribe(List => this.UserTemplatesList = List);
  }

  searchChanged(e:Event) {
    // Call our service function which returns an Observable
    // this.results = this.UserTemplatesList.filter(x=>x.Description.match(this.searchTerm));
  }

  UpdateList() {
    this.authService.getUserTemplateList().subscribe(
      data => {
        this.dataService.SetUserTemplateList(data);
        // this.UserTemplatesList = data;
      },
      error => {
        this.alertService.error("Failed to get event list" + error)
      }
    );
  }

  async editTemplate(templateList: UserTemplates) {
    const CreateTemplatemodel = await this.modalController.create({
      component: CreateTemplatePage,
      componentProps: {
        tempTemplteObj: templateList
      }
    });
    CreateTemplatemodel.onDidDismiss().then(
      (data: any) => {
        if (data.data != null) {
          let testObj = data.data as UserTemplates;
          this.authService.AddUpdateUserTemplate(testObj.ID.toString(), testObj.Description, testObj.TextTemplate).
            subscribe(data => {
              this.alertService.success("Template Saved Successfully");
              this.UpdateList();
            },
              error => {
                this.alertService.error("Something Went Wrong Please Check Log");
              })
        }
      })
    return await CreateTemplatemodel.present();
    // let prompt =await this.alertCtrl.create({ 
    //   header: 'Edit Template : ' + templateList.Description,
    //   inputs: [{
    //     name: templateList.TextTemplate,
    //     placeholder: 'Template Text',
    //     type: 'text'
    //   }],
    //   buttons: [
    //     {
    //       text: 'Cancel'
    //     },
    //     {
    //       text: 'Save',
    //       handler: data => {
    //         let index = this.UserTemplatesList.indexOf(templateList);

    //         if (index > -1) {
    //           this.UserTemplatesList[index] = data;
    //         }
    //       }
    //     }
    //   ]
    // });
    // prompt.present();
  }

  async deleteTemplate(templateList: UserTemplates) {
    let prompt = await this.alertCtrl.create({
      header: 'Do u really want to delete template ?',
      message: templateList.Description,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: data => {
            let index = this.UserTemplatesList.indexOf(templateList);
            if (index > -1) {
              this.authService.RemoveTemplateById(templateList.ID.toString()).
                subscribe(data => {
                  this.alertService.success("Template Removed Successfully");
                  this.UserTemplatesList.splice(index, 1);
                },
                  error => {
                    this.alertService.error("Something Went Wrong Please Check Log");
                  })
            }
          }
        }
      ]
    });
    prompt.present();
  }
  async openCreateTemplateModel() {
    const CreateTemplatemodel = await this.modalController.create({
      component: CreateTemplatePage,
      componentProps: {
        tempTemplteObj: new UserTemplates()
      }
    });
    CreateTemplatemodel.onDidDismiss().then(
      (data: any) => {
        var testObj = data.data as UserTemplates;
        this.authService.AddUpdateUserTemplate("0", testObj.Description, testObj.TextTemplate).
          subscribe(data => {
            this.alertService.success("Template Created Successfully");
            this.UpdateList();
          },
            error => {
              this.alertService.error("Something Went Wrong Please Check Log");
            })
      })
    return await CreateTemplatemodel.present();
  }
}
