import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-get-messages',
  templateUrl: './get-messages.page.html',
  styleUrls: ['./get-messages.page.scss'],
})
export class GetMessagesPage implements OnInit {
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  BackButtonClick()
  {
    this.modalController.dismiss();
  }
}
