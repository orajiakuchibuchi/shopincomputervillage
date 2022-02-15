import { TranslateModule } from '@ngx-translate/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NgxSpinnerModule } from "ngx-spinner";
// import { HeaderComponent } from './shared/header/header.component';
import { HeaderModule } from './header/header.module';
import { RightNavigationComponent } from './right-navigation/right-navigation.component';
import { LeftNavigationComponent } from './left-navigation/left-navigation.component';
import { FooterComponent } from './footer/footer.component';
import { I18nModule } from '../i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModalComponent } from './form-modal/form-modal.component';
import {RouterModule} from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NotificationComponent } from './notification/notification.component';
import { CalendarComponent } from './calendar/calendar.component';
import {WebcamModule} from 'ngx-webcam';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartComponent } from './chart/chart.component'; // <-- import the module
import { ChartsModule } from 'ng2-charts';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [
    LoaderComponent,
    RightNavigationComponent,
    LeftNavigationComponent,
    FooterComponent,
    SelectLanguageComponent,
    PageHeaderComponent,
    PaginationComponent,
    NotificationComponent,
    CalendarComponent,
    ChartComponent,
    // FormModalComponent,
  ],
  imports: [
    CommonModule,
    I18nModule,
    HeaderModule,
    ChartsModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
    WebcamModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.chasingDots,
        backdropBackgroundColour: 'rgb(8 0 0 / 45%)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#000000',
        tertiaryColour: '#ffffff'
    })
  ],
  exports: [
    LoaderComponent,
    RightNavigationComponent,
    I18nModule,
    ChartComponent,
    LeftNavigationComponent,
    HeaderModule,
    CommonModule,
    TranslateModule,
    FooterComponent,
    SelectLanguageComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // FormModalComponent
    PageHeaderComponent,
    PaginationComponent,
    NgxSpinnerModule,
    NotificationComponent,
    CalendarComponent,
    WebcamModule,
    NgxPaginationModule,
    NgxLoadingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
