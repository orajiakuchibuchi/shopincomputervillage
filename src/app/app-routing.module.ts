import { WithdrawalComponent } from './pages/withdrawal/withdrawal.component';
import { InvestmentComponent } from './pages/investment/investment.component';
import { AuthUserResolver } from './module/http/resolve/auth-user.resolver';
import { AccountComponent } from './pages/account/account.component';
import { GuideComponent } from './pages/guide/guide.component';
import { IpGuard } from './module/http/guard/ip.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './module/http/guard/authenticated.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {
    path: 'guide',
    component: GuideComponent
  },
  {
    path: 'investment',
    component: InvestmentComponent
  },
  {
    path: 'withdrawal',
    component: WithdrawalComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    resolve: {
      user: AuthUserResolver
    }
  },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
