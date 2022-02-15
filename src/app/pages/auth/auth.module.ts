import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    AuthNavComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  
  exports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
