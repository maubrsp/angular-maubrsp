import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Logger } from '../logger/ng-logger';

@Injectable()
export class BaseErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private logger: Logger) {}

  public handleError(error: any) {
    this.logger.error('handle error before initialization complete :: ', error);
  }

  private showError(message: string) {
    this.logger.error('show error handling: ', message);
  }
}
