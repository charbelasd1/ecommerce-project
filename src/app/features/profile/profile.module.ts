import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProfileModule { }