import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../state/auth.actions';
import { AuthState } from '../state/auth.reducers';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store<AuthState>);
  
  // Skip adding token for Firebase auth endpoints
  if (req.url.includes('firebaseauth') || req.url.includes('identitytoolkit')) {
    return next(req);
  }
  
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user || !user.token) {
      // Only dispatch logout for non-auth URLs that require authentication
      if (!req.url.includes('/login') && !req.url.includes('/signup')) {
        store.dispatch(logout());
      }
      return next(req);
    }

    // Add the token to the request
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${user.token}` }
    });
    
    return next(authReq);
  } catch (error) {
    console.error('Error in token interceptor:', error);
    router.navigateByUrl('/login');
    return next(req);
  }
};
