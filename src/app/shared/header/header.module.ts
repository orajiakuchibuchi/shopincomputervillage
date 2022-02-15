import { FormModalComponent } from './../form-modal/form-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { LayoutSettingComponent } from './layout-setting/layout-setting.component';
import { NavNotificationComponent } from './nav-notification/nav-notification.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavSearchComponent,
    LayoutSettingComponent,
    NavNotificationComponent,
    FormModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    NavSearchComponent,
    LayoutSettingComponent,
    FormModalComponent,
    NavNotificationComponent]
})

export class HeaderModule { }
