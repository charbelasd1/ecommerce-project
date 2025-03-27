import { Component, Input, OnInit } from '@angular/core';
import { logout } from '../../auth/state/auth.actions';
import { AuthState } from '../../auth/state/auth.reducers';
import { select, Store } from '@ngrx/store';
import { CartService } from '../../../features/cart/services/cart.service';
import { isLoggedIn, isLoggedOut } from '../../auth/state/auth.selector';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  constructor(
    private store: Store<AuthState>,
    public cart: CartService
  ) {}

  //  searchValue='';
  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }
  onLogout() {
    this.store.dispatch(logout());
  }
}
