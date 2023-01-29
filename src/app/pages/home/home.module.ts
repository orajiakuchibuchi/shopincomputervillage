import { RecentlyViewedComponent } from './../dashboard/recently-viewed/recently-viewed.component';
import { BannerAdComponent } from './../dashboard/banner-ad/banner-ad.component';
import { BestSellerComponent } from './../dashboard/best-seller/best-seller.component';
import { BannerComponent } from './../dashboard/banner/banner.component';
import { DealsOfWeekComponent } from './../dashboard/deals-of-week/deals-of-week.component';
import { TopRatedComponent } from './../dashboard/top-rated/top-rated.component';
import { OnsaleComponent } from './../dashboard/onsale/onsale.component';
import { FeaturedComponent } from './../dashboard/featured/featured.component';
import { BigDealsComponent } from './../dashboard/big-deals/big-deals.component';


import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AboutComponent } from '../about/about.component';
import { FAQComponent } from '../faq/faq.component';
import { TrackOrderComponent } from '../track-order/track-order.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,

    BigDealsComponent,
    FeaturedComponent,
    OnsaleComponent,
    TopRatedComponent,
    DealsOfWeekComponent,
    BannerComponent,
    BestSellerComponent,
    BannerAdComponent,
    RecentlyViewedComponent,
    AboutComponent,
    FAQComponent,
    TrackOrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [

    BigDealsComponent,
    FeaturedComponent,
    OnsaleComponent,
    TopRatedComponent,
    DealsOfWeekComponent,
    BannerComponent,
    BestSellerComponent,
    BannerAdComponent,
    RecentlyViewedComponent,
    DashboardComponent,
    HomeRoutingModule
  ]
})
export class HomeModule { }
