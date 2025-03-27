import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { ILoginRequest, ILoginResponse, iSignUpRequest, iSignUpResponse } from '../models/auth.model';
import { environment } from '../../../../env/env.dev';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) {}

  login(req: ILoginRequest): Observable<ILoginResponse> {
    return from(this.afAuth.signInWithEmailAndPassword(req.email, req.password))
      .pipe(
        switchMap((userCredential: any) => {
          const tokenPromise = userCredential.user?.getIdToken() || Promise.resolve('');
          return from(tokenPromise).pipe(
            map(token => {
              return {
                user: {
                  uid: userCredential.user?.uid || '',
                  email: userCredential.user?.email || '',
                  displayName: userCredential.user?.displayName || '',
                  photoURL: userCredential.user?.photoURL || '',
                  emailVerified: userCredential.user?.emailVerified || false,
                },
                token: token as string
              } as ILoginResponse;
            })
          );
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error(error.message));
        })
      );
  }

  signup(req: iSignUpRequest): Observable<iSignUpResponse> {
    return from(this.afAuth.createUserWithEmailAndPassword(req.email, req.password))
      .pipe(
        map((userCredential: any) => {
          // Update profile with first and last name
          if (userCredential.user) {
            userCredential.user.updateProfile({
              displayName: `${req.firstName} ${req.lastName}`
            });
          }
          
          return {
            user: {
              uid: userCredential.user?.uid || '',
              email: userCredential.user?.email || '',
              displayName: `${req.firstName} ${req.lastName}`,
              emailVerified: userCredential.user?.emailVerified || false,
            }
          };
        }),
        catchError(error => {
          console.error('Signup error:', error);
          return throwError(() => new Error(error.message));
        })
      ) as Observable<iSignUpResponse>;
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  getCurrentUser(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }

  getIdToken(): Observable<string | null> {
    return this.afAuth.idToken;
  }
}
