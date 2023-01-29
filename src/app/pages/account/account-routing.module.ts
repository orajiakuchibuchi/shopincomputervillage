import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/core/http/guard/authenticated.guard';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    data: { page: 'dashboard' },
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'profile', component: IndexComponent,
    data: { page: 'profile' },
    canActivate: [AuthenticatedGuard]

  },
  {
    path: 'orders', component: IndexComponent,
    data: { page: 'orders' },
    canActivate: [AuthenticatedGuard]

  },
  {
    path: 'change-password', component: IndexComponent,
    data: { page: 'change password' },
    canActivate: [AuthenticatedGuard]

  },
  {
    path: 'ticket', component: IndexComponent,
    data: { page: 'ticket' },
    canActivate: [AuthenticatedGuard]

  },
  {
    path: 'dashboard', component: IndexComponent,
    data: { page: 'dashboard' },
    canActivate: [AuthenticatedGuard]

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
