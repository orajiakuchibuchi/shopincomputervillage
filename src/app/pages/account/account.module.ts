import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderStatComponent } from './order-stat/order-stat.component';
import { TicketStatComponent } from './ticket-stat/ticket-stat.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';


@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    OrdersComponent,
    ChangePasswordComponent,
    TicketComponent,
    DashboardComponent,
    OrderStatComponent,
    TicketStatComponent,
    TicketCreateComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
