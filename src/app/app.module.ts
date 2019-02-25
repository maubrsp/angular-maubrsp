import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ClickOutsideModule } from 'ng-click-outside';

import { AppComponent } from './app.component';
import { AppService } from './services/application/app.service';

import { LoaderComponent } from './components/ui/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageTestModule } from './features/page-test/page-test.module';
import { MenubutonComponent } from './components/ui/menubuton/menubuton.component';
import { DropdownComponent } from './components/ui/dropdown/dropdown.component';
import { NgLoggerModule, Logger } from './core/logger/ng-logger';

import {
  TranslateModule,
  TranslateService,
  TranslateLoader
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BaseErrorHandler } from './core/error/baseErrorHandler';
import { I18nInitializer } from './core/initializers/i18n/i18n.initializer';
import { I18nConfiguration } from './core/initializers/i18n/i18n.config';
import { PreloaderInitializer } from './core/initializers/preloader/preloader.initializer';
import {
  SvgInitializer,
  SvgEndpoint
} from './core/initializers/svg/svg.initializer';
import { AppRoutingModule } from './app-route.module';
import { HomeModule } from './features/home/home.module';
import { ContentComponent } from './components/content/content.component';
import { ComponentsPageModule } from './features/components-page/components-page.module';
import { StateService } from './services/application/state.service';
import { ButtonModule } from './components/ui/button/button.module';
import { IconModule } from './components/ui/icon/icon.module';
import { TasksModule } from './features/tasks/tasks.module';

registerLocaleData(localePt);

export function initApp(appService: AppService) {
  return () => appService.initializeApp();
}

/**
 * Factory
 * @param httpClient TranslateHttpLoader
 */
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HeaderComponent,
    MenuComponent,
    MenubutonComponent,
    DropdownComponent,
    ContentComponent
  ],
  exports: [RouterModule, ButtonModule, IconModule],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgLoggerModule.forRoot(5),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ClickOutsideModule,
    AppRoutingModule,
    PageTestModule,
    HomeModule,
    ComponentsPageModule,
    TasksModule,
    ButtonModule,
    IconModule
  ],
  providers: [
    HttpClient,
    SvgEndpoint,
    I18nConfiguration,
    AppService,
    StateService,
    { provide: ErrorHandler, useClass: BaseErrorHandler },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: I18nInitializer,
      deps: [TranslateService, I18nConfiguration, Logger],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: PreloaderInitializer,
      deps: [Logger],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: SvgInitializer,
      deps: [HttpClient, SvgEndpoint, Logger],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
