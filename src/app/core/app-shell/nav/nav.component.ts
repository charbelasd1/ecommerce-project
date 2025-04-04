import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartService } from '../../../features/cart/services/cart.service';
import { logout } from '../../auth/state/auth.actions';
import { AuthState } from '../../auth/state/auth.reducers';
import { isLoggedIn, isLoggedOut } from '../../auth/state/auth.selector';

/**
 * NavComponent provides the main navigation header for the application.
 * It integrates with the authentication state management and cart service
 * to provide dynamic navigation options and cart status.
 *
 * Features:
 * - Displays different navigation options based on authentication state
 * - Shows cart items count using Material Badge
 * - Handles user logout functionality
 * - Responsive design for various screen sizes
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  /** Observable for tracking user's logged-in state */
  isLoggedIn$!: Observable<boolean>;
  
  /** Observable for tracking user's logged-out state */
  isLoggedOut$!: Observable<boolean>;

  /**
   * Initializes the navigation component with required services
   * @param store - NgRx store for state management
   * @param cart - Service for managing shopping cart functionality
   */
  constructor(
    private store: Store<AuthState>,
    public cart: CartService
  ) {}

  /**
   * Initializes the component by setting up authentication state observables
   */
  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  /**
   * Handles user logout by dispatching logout action to the store
   */
  onLogout() {
    this.store.dispatch(logout());
  }
}
