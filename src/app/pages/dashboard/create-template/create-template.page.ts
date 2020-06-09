import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserTemplates } from 'src/app/models/UserTemplates';
import { DataService } from 'src/app/services/DataService';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.page.html',
  styleUrls: ['./create-template.page.scss'],
})
export class CreateTemplatePage implements OnInit {

  tempTemplteObj : UserTemplates;
  selected_name :string='';
  dob:string='';

  templateForm: FormGroup = new FormGroup({
    Description: new FormControl('', [Validators.required]),
    TextTemplate: new FormControl('', [Validators.required]),
  });

  constructor(private modalController: ModalController,
    private dataService:DataService,
    private authService:AuthService,
    private alertService:AlertService) {
   
   }

  ngOnInit() {
  }

  BackButtonClick()
  {
    this.modalController.dismiss(null);
  }

  SaveAndCloseClicked(){
    if (this.templateForm.invalid) {
      return;
  }
  else
    this.modalController.dismiss(this.tempTemplteObj);
  }

  public addName(event) {
   this.tempTemplteObj.TextTemplate = this.tempTemplteObj.TextTemplate + " <Name>" 
}

public AddTag(tag : string)
{
  this.tempTemplteObj.TextTemplate = this.tempTemplteObj.TextTemplate + " <"+tag+">";

}

public dobEvent(event) {
  this.tempTemplteObj.TextTemplate = this.tempTemplteObj.TextTemplate + " <DOB>" 
}

}
