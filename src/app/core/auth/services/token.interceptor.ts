import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserAuthService } from './user-login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../state/auth.actions';
import { AuthState } from '../state/auth.reducers';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store<AuthState>);
  const user = JSON.parse(localStorage.getItem('user')!);
  if (!user) {
    // alert(`there is no user in local storage`);
    store.dispatch(logout());
    return next(req);
  }

  const token = user.token;

  if (token) {
    const decodedToken = jwtDecode(token);
    const isExpired =
      decodedToken && decodedToken.exp
        ? decodedToken.exp * 1000 < Date.now()
        : false;

    if (isExpired) {
      alert(`Session expired! Please login again.`);
      store.dispatch(logout());
    } else {
    }
  } else {
    router.navigateByUrl('/login');
  }
  return next(req);
};
