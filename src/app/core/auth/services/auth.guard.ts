import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from './user-login.service';
import { inject } from '@angular/core';
import { AuthState } from '../state/auth.reducers';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from '../state/auth.selector';
import { tap } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<AuthState>);
  return store.pipe(
    select(isLoggedIn),
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigateByUrl('/login');
      }
    })
  );
};
