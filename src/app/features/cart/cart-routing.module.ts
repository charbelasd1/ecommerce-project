import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartGridComponent } from './components/cart-grid/cart-grid.component';

const routes: Routes = [{ path: '', component: CartGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
