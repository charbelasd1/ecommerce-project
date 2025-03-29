import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'products',
    loadComponent: () => import('./products/admin-products.component')
      .then(m => m.AdminProductsComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/admin-users.component')
      .then(m => m.AdminUsersComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }