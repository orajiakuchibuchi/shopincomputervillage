import { UnauthenticatedGuard } from './../../module/http/guard/unauthenticated.guard';
import { AuthenticatedGuard } from './../../module/http/guard/authenticated.guard';
import { LogoutComponent } from './logout/logout.component';
import { IpGuard } from './../../module/http/guard/ip.guard';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from './../../i18n/i18n.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { path: 'auth/login', component: LoginComponent, canActivate: [UnauthenticatedGuard, IpGuard]},
  { path: 'auth/register', component: RegisterComponent, canActivate: [IpGuard]},
  { path: 'auth/forgot-password', component: ForgotPasswordComponent, canActivate: [IpGuard]},
  { path: 'auth/reset-password', component: ResetPasswordComponent, canActivate: [IpGuard]},
  { path: 'auth/log-out', component: LogoutComponent, canActivate: [IpGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    TranslateModule,
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
