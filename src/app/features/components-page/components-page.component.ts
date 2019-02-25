import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/application/app.service';
import { Logger } from '../../core/logger/ng-logger';
import { AppStateChildrens } from '../../services/application/actions.enum';
import { StateService } from '../../services/application/state.service';

@Component({
  selector: 'app-components-page',
  templateUrl: './components-page.component.html',
  styleUrls: ['./components-page.component.scss']
})
export class ComponentsPageComponent implements OnInit {
  private data: object = {};
  private iconId: string = '#search-input';

  constructor(private stateService: StateService, private logger: Logger) {
    this.stateService
      .getData([
        AppStateChildrens.APPLICATIONPARAMS,
        AppStateChildrens.STYLEGUIDE,
        AppStateChildrens.DEFAULTDATA
      ])
      .then(value => {
        this.logger.log('Component page get state data complete :: ', value);
        this.data = value;
      })
      .catch(error => {
        this.logger.error(error);
      });
  }

  ngOnInit() {}
}
