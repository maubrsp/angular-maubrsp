import { Component, OnInit } from '@angular/core';
import {
  AppStateChildrens,
  ApplicationActions
} from './services/application/actions.enum';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Logger } from './core/logger/ng-logger';
import { StateService } from './services/application/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Angular - maubrsp';

  private navigationObserver: any;
  private scopeId: String = '_rootScope';
  private data: object = {};

  constructor(
    private stateService: StateService,
    private router: Router,
    private logger: Logger
  ) {}

  ngOnInit() {
    this.navigationObserver = this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationEnd || event instanceof NavigationStart
        )
      )
      .subscribe(res => this.routerChangeHandler(res));

    this.stateService.registerObservableAction(
      ApplicationActions.STATECHANGE,
      this.scopeId,
      this.updateState,
      this
    );

    setTimeout(() => {
      this.initialize();
    }, 10);
  }

  initialize() {
    if (!this.data) {
      setTimeout(() => {
        this.initialize();
      }, 500);
      return;
    }
    const newState: Object = {};
    newState[AppStateChildrens.APPLICATIONPARAMS] = {
      loading: false,
      appReady: true
    };
    this.stateService.executeAction(ApplicationActions.SETSTATE, newState);
  }

  routerChangeHandler(event) {
    this.logger.log(
      'Change router > ',
      event instanceof NavigationStart ? 'start' : 'end'
    );
    const newState: Object = {};
    if (event instanceof NavigationStart) {
      newState[AppStateChildrens.APPLICATIONPARAMS] = {
        showMenu: false,
        showPage: false
      };
    } else {
      newState[AppStateChildrens.APPLICATIONPARAMS] = {
        showMenu: false,
        showPage: true
      };
    }

    this.stateService.executeAction(ApplicationActions.SETSTATE, newState);
  }

  menuChange(event: any) {
    if (!this.data || !this.data[AppStateChildrens.APPLICATIONPARAMS]) return;
    const newState: Object = {};
    newState[AppStateChildrens.APPLICATIONPARAMS] = {
      showMenu:
        this.data[AppStateChildrens.APPLICATIONPARAMS]['showMenu'] === true ||
        event === null
          ? false
          : true
    };

    this.stateService.executeAction(ApplicationActions.SETSTATE, newState);
  }

  loaderFinishHandler() {
    // console.log('finish loading', this.data);
  }

  updateState() {
    if (!this.stateService && !this['scope']) return;
    const scopestateService = this.stateService
      ? this.stateService
      : this['scope'].stateService;
    const scopeThis = this.stateService ? this : this['scope'];
    scopestateService
      .getData([
        AppStateChildrens.APPLICATIONPARAMS,
        AppStateChildrens.STYLEGUIDE,
        AppStateChildrens.DEVICE,
        AppStateChildrens.ROUTES,
        AppStateChildrens.DEFAULTDATA
      ])
      .then(value => scopeThis.setState(value))
      .catch(error => {
        this.logger.error(error);
      });
  }

  setState(value: any) {
    this.data = value;
  }
}
