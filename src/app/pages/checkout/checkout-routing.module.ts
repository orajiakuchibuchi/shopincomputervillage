import { ClearanceComponent } from './clearance/clearance.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/core/http/guard/authenticated.guard';

const routes: Routes = [
  { path: '', redirectTo:'cart', pathMatch: 'full' },
  { path: 'cart', component: CartComponent, canActivate: [AuthenticatedGuard]},
  { path: 'clearance', component: ClearanceComponent, canActivate: [AuthenticatedGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
