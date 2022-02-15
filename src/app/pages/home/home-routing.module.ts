import { IpGuard } from './../../module/http/guard/ip.guard';
import { AuthenticatedGuard } from './../../module/http/guard/authenticated.guard';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent, children:[
    { path: '', component: DashboardComponent}
    ], canActivate: [IpGuard, AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
