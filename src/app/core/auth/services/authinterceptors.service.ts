import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, switchMap } from 'rxjs';

import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.reducers';
import { token } from '../state/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthinterceptorsService implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(token).pipe(
      first(),
      switchMap((token) => {
        const authReq = !!token
          ? req.clone({
              setHeaders: { Authorization: 'Bearer ' + token },
            })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
