import { LoaderInterceptor } from './core/http/interceptors/loader.interceptor';
import { HeaderInterceptor } from './core/http/interceptors/header.interceptor';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { I18nModule } from './i18n/i18n.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { StoreModule } from '@ngrx/store';

import {ConnectionServiceModule} from 'ng-connection-service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ErrorInterceptor } from './core/http/interceptors/error.interceptor';
import { DeviceInfoInterceptor } from './core/http/interceptors/device-info.interceptor';
import { UrlCachingInterceptor } from './core/http/interceptors/url-caching.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    HomeModule,
    I18nModule,
    HttpClientModule,
    SocialLoginModule,

    ConnectionServiceModule,
    SimpleNotificationsModule.forRoot(
      {
        position: ["bottom", "left"],
        theClass: 'notificationCustom'
      }
    )
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DeviceInfoInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UrlCachingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.google_client_id
            )
          }
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
