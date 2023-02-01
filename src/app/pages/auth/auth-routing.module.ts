import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedGuard } from 'src/app/core/http/guard/unauthenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: AuthComponent, children: [
      {
        path: '', component: LoginComponent,
        canActivate: [UnauthenticatedGuard]
      }
    ]
  },
  {
    path: 'register', component: AuthComponent, children: [
      {
        path: '', component: RegisterComponent,
        canActivate: [UnauthenticatedGuard]
      }
    ]
  },
  {
    path: 'forgot-password', component: AuthComponent, children: [
      {
        path: '', component: ForgotPasswordComponent, data: {forgotPassword: false},
        canActivate: [UnauthenticatedGuard]
      },
      {
        path: 'onetime-login', component: ForgotPasswordComponent, data: {forgotPassword: false},
        canActivate: [UnauthenticatedGuard]
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
