import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { IndexComponent } from './index/index.component';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { SortpanelComponent } from './sortpanel/sortpanel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductModule } from '../product/product.module';


@NgModule({
  declarations: [
    IndexComponent,
    ControlpanelComponent,
    SortpanelComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    ProductModule
  ]
})
export class ShopModule { }
