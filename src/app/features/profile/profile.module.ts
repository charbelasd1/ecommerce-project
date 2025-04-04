// Profile Module: Manages user profile and account settings
// Features: Profile viewing/editing, order history, admin dashboard
// Components: ProfileInfo (view), ProfileEdit (update), PreviousOrders (history)
// Includes: Reactive forms for data management and Material UI components
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProfileModule { }