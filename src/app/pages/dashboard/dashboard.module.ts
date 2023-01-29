
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigDealsComponent } from './big-deals/big-deals.component';
import { FeaturedComponent } from './featured/featured.component';
import { OnsaleComponent } from './onsale/onsale.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { DealsOfWeekComponent } from './deals-of-week/deals-of-week.component';
import { BannerComponent } from './banner/banner.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { BannerAdComponent } from './banner-ad/banner-ad.component';
import { RecentlyViewedComponent } from './recently-viewed/recently-viewed.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BigDealsComponent,
    FeaturedComponent,
    OnsaleComponent,
    TopRatedComponent,
    DealsOfWeekComponent,
    BannerComponent,
    BestSellerComponent,
    BannerAdComponent,
    RecentlyViewedComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
