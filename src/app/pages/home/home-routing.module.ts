
import { HomeComponent } from './home.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { FAQComponent } from '../faq/faq.component';
import { TrackOrderComponent } from '../track-order/track-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
  {
    path: 'marketplace', component: HomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'reset-password/:authToken', component: DashboardComponent,
        data: {resettingPassword: true} },
    ]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'faq',
    component: FAQComponent
  },
  {
    path: 'track-order',
    component: TrackOrderComponent
  },
  {
    path: 'account',
    loadChildren: () => import('../../pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('../../pages/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('../../pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('../../pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
