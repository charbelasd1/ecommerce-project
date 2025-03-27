import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSaleComponent } from './components/main-sale/main-sale.component';

const routes: Routes = [
  {
    path: '',
    component: MainSaleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleRoutingModule {}
