import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuListComponent } from './components/menu-list/menu-list.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: 'menu', component: MenuListComponent },
  { path: 'cart', component: CartSummaryComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: 'menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}