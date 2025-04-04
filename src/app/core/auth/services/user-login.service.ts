// Core authentication service that handles user login, signup, and admin verification
// Integrates with Firebase Authentication for secure user management
// Provides methods for user authentication, token management, and admin access control
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IAdminResponse, IAdminUser } from '../models/admin.model';
import { ILoginRequest, ILoginResponse, iSignUpRequest, iSignUpResponse } from '../models/auth.model';

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

  isAdmin(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) return of(false);
        return from(user.getIdTokenResult()).pipe(
          map(idTokenResult => {
            return idTokenResult.claims?.['admin'] === true;
          })
        );
      })
    );
  }

  async setAdminClaim(uid: string): Promise<IAdminResponse> {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        return { success: false, message: 'No user is currently logged in' };
      }

      // In a real application, you would make an HTTP call to your backend
      // which would then use Firebase Admin SDK to set custom claims
      // For demo purposes, we'll simulate the admin claim locally
      const idTokenResult = await user.getIdTokenResult(true);
      const isAdmin = idTokenResult.claims?.['admin'] === true;

      return {
        success: true,
        message: `User is ${isAdmin ? 'now an admin' : 'not an admin'}`,
        user: { ...user, isAdmin } as IAdminUser
      };
    } catch (error) {
      console.error('Error setting admin claim:', error);
      return { success: false, message: 'Failed to set admin claim' };
    }
  }
}
