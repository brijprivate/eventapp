import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  BackButtonClick()
  {
    this.modalController.dismiss();
  }

}
