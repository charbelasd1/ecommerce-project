import { inject, Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { UserAuthService } from '../services/user-login.service';
import { EffectsModule, Actions, createEffect, ofType } from '@ngrx/effects';
import { login } from './auth.actions';
import { tap, catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ILoginRequest, ILoginResponse } from '../models/auth.model';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { currentUser } from './auth.selector';
@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private cartItems: CartService,
    private store: Store
  ) {}
  currentUser!: number;
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          // console.log('Effect triggered:', action);

          localStorage.setItem(
            'user',
            JSON.stringify({
              email: action.email,
              token: action.token,
              userId: action.userId,
            })
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),

        tap((action) => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}
