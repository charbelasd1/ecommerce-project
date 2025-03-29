import { CanActivateFn, Router } from '@angular/router';
// This is a suggestion based on typical auth guard implementation
// You'll need to adjust it to match your actual auth guard file
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AuthState } from '../state/auth.reducers';
import { isLoggedIn } from '../state/auth.selector';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);
  
  return store.select(isLoggedIn).pipe(
    take(1),
    map(loggedIn => {
      if (loggedIn) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
