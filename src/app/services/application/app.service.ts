import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * use for local development,
 * uncoment next import
 * set isOff to true
 * uncoment localData || null
 */
import { localData } from './localData';
import { Router } from '@angular/router';
import { deviceDetectorInitializer } from '../../core/initializers/device/devicedetector.initializer';
import { Logger } from '../../core/logger/ng-logger';
import { dynamicRoutesInitializer } from '../../core/initializers/router/dynamicroutes.initializer';
import { ApplicationActions, AppStateChildrens } from './actions.enum';
import { StateService } from './state.service';

@Injectable()
export class AppService {
  private observers: any = {};
  // private data: Object = null;

  private localData = localData || null;

  constructor(
    private _http: HttpClient,
    private stateService: StateService,
    private injector: Injector,
    public logger: Logger
  ) {}

  public initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.logger.log('Initializing AppService');
      let deviceData = {};
      let stateData = {};

      deviceDetectorInitializer(this.logger)
        .then(res => {
          deviceData = res;
          return this.stateService.loadData();
        })
        .then(res => {
          stateData = res;
          stateData['applicationParams']['loading'] = true;
          stateData['device'] = deviceData;

          const router = this.injector.get(Router);

          return dynamicRoutesInitializer(
            stateData['routes'],
            router,
            this.logger
          );
        })
        .then(res => {
          this.logger.log('AppService initilization complete!');
          this.stateService.initializeState(stateData);
          resolve();
        })
        .catch(error => {
          this.logger.error('Error initializing AppService ::', error);
          reject(error);
        });
    });
  }
}
