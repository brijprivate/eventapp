import { Component } from '@angular/core';
import { ModalController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { CreateEventPage } from '../create-event/create-event.page';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/DataService';
import { AuthService } from 'src/app/services/auth.service';
import { UserEvents } from 'src/app/models/UserEvents';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // results: Observable<any>[];
  searchTerm: string = '';
  UserEventList: UserEvents[] = [];

  constructor(private modalController: ModalController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private dataService: DataService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertService: AlertService) {
    this.UserEventList = null;
    this.UpdateEventList();
    // var text = "";
    // var len = 5
    // var charset = "0123456789";
    // for (var i = 0; i < len; i++)
    //   text += charset.charAt(Math.floor(Math.random() * charset.length));

    // throw new Error(this.dataService.getUserID() + "("+text+") => "+"asdasdasd");
  }

  async UpdateEventList() {
    const loading = await this.loadingController.create({
      message: 'Getting Event List Please Wait..',
    });
    loading.present();
    this.authService.getAllEventListByID().subscribe(
      async data => {
        if (data == null || data.length == 0) {
          const toast = await this.toastController.create({
                  message: "Seems you haven't created yet any event, Let's Create",
                  color: "tertiary",
                  duration: 2000
                });
                toast.present();
        }
        else {
          console.log("event list count = " + data.length);
          this.dataService.SetUserEventList(data);
          this.UserEventList = this.dataService.GetUserEventList();
        }
        loading.dismiss();
      },
      error => {
        this.alertService.error("Failed to get event list" + error);
        loading.dismiss();
      }
    );
  }

  async openCreateEventModel() {
    const CreateEventmodel = await this.modalController.create({
      component: CreateEventPage,
      componentProps: {
        tempEventObj: new UserEvents()
      }
    });

    CreateEventmodel.onDidDismiss().then(
      (data: any) => {
      this.UpdateEventList();

        // var testObj = data.data as UserEvents;
        // this.authService.AddUpdateUserEvent(testObj)
        //   .then(
        //     async (res: any) => {
        //       this.alertService.success("Event Created Successfully");
        //       this.UpdateEventList();
        //     }
        //   )
        //   .catch(err => {
        //     console.log(err);
        //     this.alertService.error("Something Went Wrong Please Check Log");
        //   }
          // );
        }
    )
    
    return await CreateEventmodel.present();
  }

  async editEvent(eventList: UserEvents) {
    const CreateTemplatemodel = await this.modalController.create({
      component: CreateEventPage,
      componentProps: {
        tempEventObj: eventList
      }
    });
    CreateTemplatemodel.onDidDismiss().then(
      // (data: any) => {
      //   if (data.data != null) {
      //     let testObj = data.data as UserEvents;
      //     this.authService.AddUpdateUserTemplate(testObj.ID.toString(), testObj.Description, testObj.TextTemplate).
      //       subscribe(data => {
      //         this.alertService.success("Template Saved Successfully");
      //         this.UpdateEventList();
      //       },
      //         error => {
      //           this.alertService.error("Something Went Wrong Please Check Log");
      //         })
      //   }
      // }
    )
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


  searchChanged(e: Event) {
    // Call our service function which returns an Observable
    // this.results = this.UserTemplatesList.filter(x=>x.Description.match(this.searchTerm));
  }
}
