import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataService } from 'src/app/services/DataService';
import { UserDetails } from 'src/app/models/UserDetails';


@Component({
  selector: 'app-refer-and-earn',
  templateUrl: './refer-and-earn.page.html',
  styleUrls: ['./refer-and-earn.page.scss'],
})
export class ReferAndEarnPage implements OnInit {
  userDetails: UserDetails;
  userReferanceCode :string;
  constructor(private modalController: ModalController, private socialSharing:SocialSharing,  private dataService: DataService,) { }

  ngOnInit() {
    this.dataService.currentUserDetails.subscribe(userDetails => this.userDetails = userDetails);
    this.userReferanceCode = this.userDetails.PhoneNo;
  }
  
  compilemsg():string{
    var msg = "Sign-up using my code "+this.userReferanceCode+" on the Myntra App & get Rs. 10 sms  free."+
    "Download the App using - http://www.cdays.in "+
    "Hurry, it doesn’t get better than this! Download the CDay's App NOW!" ;
    return msg;
  }
   shareVai(){
    var msg  = this.compilemsg();
    
     this.socialSharing.share(msg,null,null,null).then((res) => {
      console.log('res--->',res)
    }).catch((err) => {
      console.error("error-->",err);
      
    });
   }

  BackButtonClick()
  {
    this.modalController.dismiss();
  }
}
