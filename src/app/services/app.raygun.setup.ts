import * as rg4js from 'raygun4js';
import { ErrorHandler } from '@angular/core';

const VERSION_NUMBER = '1.0.0.0';
rg4js('apiKey', "zU95zcGKLPHZKtDcO46hJg");
rg4js('setVersion', VERSION_NUMBER);
rg4js('enableCrashReporting', true);
export class RaygunErrorHandler implements ErrorHandler {
  handleError(e: any) {
    rg4js('send', {
      error: e,
    });
  }
  
}

        