import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { WelcomeNoticeComponent } from '../dashboard//welcome-notice/welcome-notice.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    WelcomeNoticeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    WelcomeNoticeComponent,
    DashboardComponent,
    HomeRoutingModule
  ]
})
export class HomeModule { }
