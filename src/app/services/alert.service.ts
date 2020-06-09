import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { NGXLogger } from 'ngx-logger';
import { DataService } from './DataService';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router, 
    private logger: NGXLogger,
    private dataService:DataService,
    private toastController: ToastController) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  async success(message: string, presentToast = true, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
    if (presentToast) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      toast.present();
    }
  }

  async warning(message: string, presentToast = true, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
    var text = "";
    var len = 5
    var charset = "0123456789";
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    if (presentToast) {
      const toast = await this.toastController.create({
        message: message + "("+text+")",
        duration: 2000,
        position: 'top',
        color: 'warning'
      });
      toast.present();
    }
    throw new Error(this.dataService.getUserID() + "("+text+") => "+ message);
  }

  async error(message: string, presentToast = true, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
    var text = "";
    var len = 5
    var charset = "0123456789";
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    if (presentToast) {
      const toast = await this.toastController.create({
        message: message + "("+text+")",
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      throw new Error(this.dataService.getUserID() + "("+text+") => "+ message);
      //this.logger.error("Error MSG -> "+message+"$$User ID -> "+this.dataService.getUserID());
    }
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next();
    //this.toastController.dismiss();
  }
}
