import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { PreviousOrdersComponent } from '../previous-orders/previous-orders.component';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../core/auth/state/auth.reducers';
import { logout } from '../../../../core/auth/state/auth.actions';
import { RouterModule } from '@angular/router';
import { PreviousOrderDetailsComponent } from '../previous-order-details/previous-order-details.component';
import { UserAuthService } from '../../../../core/auth/services/user-login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider,
    PreviousOrdersComponent,
    MatIcon,
    RouterModule,
    PreviousOrderDetailsComponent,
  ],
})
export class MainProfileComponent implements OnInit {
  isAdmin$: Observable<boolean>;

  constructor(
    private store: Store<AuthState>,
    private authService: UserAuthService
  ) {
    console.log('profile loaded');
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit() {}
  onLogout() {
    this.store.dispatch(logout());
  }
}
