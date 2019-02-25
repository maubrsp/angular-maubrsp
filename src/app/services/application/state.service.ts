import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * use for local development,
 * uncoment next import
 * set isOff to true
 * uncoment localData || null
 */
import { localData } from './localData';
import { Logger } from '../../core/logger/ng-logger';
import { ApplicationActions } from './actions.enum';

@Injectable()
export class StateService {
  private observers: any = {};
  private data: object = {};

  private localData = localData || null;

  constructor(
    private _http: HttpClient,
    private injector: Injector,
    public logger: Logger
  ) {}

  public registerObservableAction(
    action: string,
    receiverName: String,
    handler: Function,
    scope: any
  ) {
    if (!this.observers[action]) {
      this.observers[action] = {};
    }
    this.observers[action][`${receiverName}`] = {
      handler: handler,
      scope: scope
    };
  }

  public unregisterObservableAction(action: string, receiverName: String) {
    delete this.observers[action][`${receiverName}`];
  }

  private notifyActionsToObserves(action: String) {
    Object.keys(this.observers[`${action}`]).forEach(value => {
      const observer: any = this.observers[`${action}`][value];
      observer.handler(this.data, observer.scope);
    });
  }

  public executeAction(action: String, data?: any) {
    switch (action) {
      case ApplicationActions.STATECHANGE:
        this.notifyActionsToObserves(ApplicationActions.STATECHANGE);
        break;

      case ApplicationActions.SETSTATE:
        this.setStateHandler(data);
        break;

      case ApplicationActions.SETSTATETOROUTE:
        this.setStateToRoutes(data);
        break;

      default:
        break;
    }
  }

  setStateToRoutes(data) {
    // TODO implement reducers
  }

  public initializeState(state: object) {
    this.data = state;
  }

  private setStateHandler(newState) {
    this.logger.log(
      'AppService setNewState :: ',
      newState,
      ' >> oldState ::',
      this.data
    );

    this.updateItenMutable(newState, this.data);
    this.notifyActionsToObserves(ApplicationActions.STATECHANGE);
  }

  updateItenMutable(newObject, oldObject) {
    Object.keys(newObject).forEach(key => {
      if (typeof newObject[key] === 'object') {
        this.updateItenMutable(newObject[key], oldObject[key]);
      } else {
        oldObject[key] = newObject[key];
      }
    });
  }

  public getData(children: Array<any>) {
    return new Promise((resolve, reject) => {
      const result: object = {};
      children.forEach(element => {
        if (!this.data[element]) {
          reject('Element dos not exist!!!');
        } else {
          result[element] = this.data[element];
        }
      });
      resolve(result);
    });
  }

  public loadData() {
    return new Promise((resolve, reject) => {
      if (this.localData !== null) {
        resolve(this.localData);
      } else {
        this._http.get('https://api.myjson.com/bins/TODO').subscribe(data => {
          resolve(data);
        });
      }
    });
  }
}
