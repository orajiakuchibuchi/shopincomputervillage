import { IndexedDbService } from './services/indexed-db.service';
import { DeviceInfoInterceptor } from './module/http/interceptors/device-info.interceptor';
import { UrlCachingInterceptor } from './module/http/interceptors/url-caching.interceptor';
import { HeaderInterceptor } from './module/http/interceptors/header.interceptor';
import { ErrorInterceptor } from './module/http/interceptors/error.interceptor';
import { LoaderInterceptor } from './module/http/interceptors/loader.interceptor';
import { AuthModule } from './pages/auth/auth.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { I18nModule } from './i18n/i18n.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { migrationFactory } from './module/database/migrations/migrationFactory';
import { StoreModule } from '@ngrx/store';
import { langReducer } from './module/state/lang/lang.reducer';
import {ConnectionServiceModule} from 'ng-connection-service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { GuideComponent } from './pages/guide/guide.component';
import { AccountComponent } from './pages/account/account.component';
import { InvestmentComponent } from './pages/investment/investment.component';
import { WithdrawalComponent } from './pages/withdrawal/withdrawal.component';

const dbConfig: DBConfig  = IndexedDbService.initalize();

@NgModule({
  declarations: [
    AppComponent,
    GuideComponent,
    AccountComponent,
    InvestmentComponent,
    WithdrawalComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AuthModule,
    I18nModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    StoreModule.forRoot({lang: langReducer}),
    ConnectionServiceModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DeviceInfoInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UrlCachingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
