/**
 * @fileoverview Login Component
 * Handles user authentication through a login form.
 * Integrates with NgRx store for state management and Firebase for authentication.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-login.service';
import { ILoginRequest } from '../../models/auth.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth.actions';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthState } from '../../state/auth.reducers';
import { tap, noop } from 'rxjs';
import { GenerateUserIdService } from '../../services/generate-user-id.service';

/**
 * LoginComponent provides the login form interface and handles authentication logic
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /** Reactive form for login credentials */
  loginForm: FormGroup;
  /** Tracks login failure state */
  isLoginFail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: UserAuthService,
    private router: Router,
    private store: Store<AuthState>,
    private generateID: GenerateUserIdService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * Handles form submission
   * Attempts to authenticate user with Firebase
   * Dispatches login action on success
   */
  onSubmit() {
    const val: ILoginRequest = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    
    console.log('Login attempt with:', val.email);
    
    this.auth
      .login(val)
      .pipe(
        tap((response) => {
          this.store.dispatch(
            login({
              email: response.user.email,
              token: response.token,
              userId: response.user.uid
            })
          );
          this.router.navigate(['']);
          this.isLoginFail = false;
        }),
        catchError((err) => {
          console.error('Login error:', err);
          alert('Login Failed');
          this.isLoginFail = true;
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => console.error('Subscription error:', err),
      });
  }

  /** Form control getter for username field */
  get username() {
    return this.loginForm.get('username');
  }
  /** Form control getter for password field */
  get password() {
    return this.loginForm.get('password');
  }
}
