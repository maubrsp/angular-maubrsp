import { ModuleWithProviders, NgModule } from '@angular/core';
import { Level } from './level.enum';
import { Logger, LOGGER_LEVEL } from './logger.service';

/**
 * Módulo de Logger
 */
@NgModule()
export class NgLoggerModule {
  /**
   * Provide the {@link Logger} with the given log {@link Level}.
   * @param level The log level.
   */
  static forRoot(level: Level): ModuleWithProviders {
    if (!window['sessionStorage']['applicationConfigs']) {
      window['sessionStorage']['applicationConfigs'] = JSON.stringify({
        mock: true,
        logLevel: level || 0
      });
    }

    const applicationConfigsData = JSON.parse(
      window['sessionStorage']['applicationConfigs']
    );
    if (applicationConfigsData.mock === undefined) {
      applicationConfigsData.mock = false;
    }
    if (
      applicationConfigsData.logLevel === undefined ||
      applicationConfigsData.logLevel > 5 ||
      applicationConfigsData.logLevel < 0
    ) {
      applicationConfigsData.logLevel = level || 0;
    }

    window['sessionStorage']['applicationConfigs'] = JSON.stringify(
      applicationConfigsData
    );

    return {
      ngModule: NgLoggerModule,
      providers: [
        Logger,
        { provide: LOGGER_LEVEL, useValue: applicationConfigsData.logLevel }
      ]
    };
  }
}
