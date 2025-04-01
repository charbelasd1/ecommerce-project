import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { PreviousOrdersComponent } from './components/previous-orders/previous-orders.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';

const routes: Routes = [
  {
    path: '',
    component: MainProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: ProfileInfoComponent
      },
      {
        path: 'edit',
        component: ProfileEditComponent
      },
      {
        path: 'previous-orders',
        component: PreviousOrdersComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
