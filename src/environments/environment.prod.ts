import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logging: {
    serverLoggingUrl: 'https://requestinspector.com/inspect/01dj8062xtgah1axkycvrmsfg0',
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.DEBUG
  }
};
