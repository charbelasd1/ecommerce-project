/**
 * @fileoverview Authentication Effects
 * Manages side effects for authentication-related actions using NgRx Effects.
 * Handles async operations like token persistence, navigation, and Firebase authentication.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';
import { CartService } from '../../../features/cart/services/cart.service';
import { UserAuthService } from '../services/user-login.service';
import * as AuthActions from './auth.actions';

/**
 * AuthEffect service handles all authentication-related side effects.
 * Manages async operations and state updates for auth actions.
 */
@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private cartItems: CartService,
    private store: Store,
    private authService: UserAuthService
  ) {
    // In the constructor or wherever you're checking for existing user
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        user.getIdToken().then(token => {
          this.store.dispatch(AuthActions.refresh({
            email: user.email || '',
            token: token,
            userId: user.uid
          }));
        });
      }
    });
  }

  /**
   * Handles successful login
   * - Persists user data to localStorage
   * - Navigates to home page
   */
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: action.email,
              token: action.token,
              userId: action.userId,
            })
          );
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  /**
   * Handles user logout
   * - Calls Firebase logout
   * - Clears local storage
   * - Redirects to login page
   */
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => this.authService.logout()),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}
