import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { IndexComponent } from './index/index.component';
import { DescriptionComponent } from './description/description.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { ReviewComponent } from './review/review.component';
import { SpecificationComponent } from './specification/specification.component';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent,
    DescriptionComponent,
    AccessoriesComponent,
    ReviewComponent,
    SpecificationComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
