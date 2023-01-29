import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartComponent } from './cart/cart.component';
import { ClearanceComponent } from './clearance/clearance.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    CartComponent,
    ClearanceComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
