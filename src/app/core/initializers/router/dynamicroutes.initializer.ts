import { Logger } from '../../logger/ng-logger';
import { Router, Routes } from '@angular/router';
import { PageTestModule } from '../../../features/page-test/page-test.module';
import { HomeModule } from '../../../features/home/home.module';
import { ComponentsPageModule } from '../../../features/components-page/components-page.module';
import { TasksModule } from '../../../features/tasks/tasks.module';

export function getPageComponent(moduleName: String) {
  // SOLVING LAZY LOADIND for latest CLI
  // https://github.com/angular/angular-cli/issues/9488

  if (moduleName.toLowerCase() === 'PageTestModule'.toLowerCase()) {
    return () => PageTestModule;
  } else if (moduleName.toLowerCase() === 'Home'.toLowerCase()) {
    return () => HomeModule;
  } else if (
    moduleName.toLowerCase() === 'ComponentsPageModule'.toLowerCase()
  ) {
    return () => ComponentsPageModule;
  } else if (moduleName.toLowerCase() === 'TasksModule'.toLowerCase()) {
    return () => TasksModule;
  }
  return () => null;
}

/**
 * Get device minimal data to specialise view and interactions
 */
export function dynamicRoutesInitializer(
  data: Array<any>,
  router: Router,
  logger: Logger
): Promise<any> {
  return new Promise((resolve, reject) => {
    logger.log('Initialize Router config ::', JSON.stringify(data));

    try {
      logger.log('Clean router config');
      while (router.config.length > 0) {
        router.config.pop();
      }
      logger.log(
        'Router config ready before process :: ',
        JSON.stringify(router.config)
      );

      logger.log('Generating new Routes ');

      const tmpRoute: Routes = [];
      data.forEach(route => {
        const routeIten = {};
        if (route.path) {
          routeIten['path'] = route.path;
        }
        if (route.redirectTo) {
          routeIten['redirectTo'] = route.redirectTo;
        }
        if (route.loadChildren) {
          const fn = getPageComponent(route.loadChildren);
          routeIten['loadChildren'] = fn;
        }
        if (route.data) {
          routeIten['data'] = route.data;
        }
        tmpRoute.push(routeIten);
      });
      logger.log('New Routes ready, inject in config');
      router.resetConfig(tmpRoute);
      logger.log(
        'Router config ready after process:: ',
        JSON.stringify(router.config)
      );

      resolve();
    } catch (error) {
      logger.error('Error initializing Router :: ', error);
      reject(error);
    }
  });
}
