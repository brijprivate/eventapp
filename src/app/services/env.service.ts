import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = '';
  API_Auth_Gloabl_URL = 'https://www.cdays.in/api/login/authenticateuser';
  API_Gloabl_URL = 'https://www.cdays.in/api/operational/';
  
  API_Auth_Local_URL = 'http://localhost/JwtWebApiCD/api/login/authenticateuser';
  API_Local_URL = 'http://localhost/JwtWebApiCD/api/operational/';

  SMS_Gateway_API = "https://api.textlocal.in/send/?apikey=gLEnr7o9SMQ-aZc1OqHoAr88Q0x6qgeQGsRs5fIsmk";
  SMS_Gateway_API_LogoUtility="https://www.logonutility.in/app/smsapi/index.php?key=25D75F639A85C5&campaign=1&routeid=20&senderid=CDAYSM&type=text";
  PhoneNumber = '';

  NetworkNotAvailableMsg = "Please Check Your Connectivity, Seems that you are offline :(";

  constructor() { }
}
