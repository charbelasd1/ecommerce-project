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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
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

  onSubmit() {
    const val: ILoginRequest = this.loginForm.value;
    console.log(val);
    this.auth
      .login(val)
      .pipe(
        tap((user) => {
          this.store.dispatch(
            login({
              email: val.username,
              token: user.Login.AccessToken,
              userId: this.generateID.stringToHex(val.username),
            })
          );
          this.router.navigate(['']);

          this.isLoginFail = false;
        }),
        catchError((err) => {
          console.error('Login error:', err);
          alert('Login Failed');
          this.isLoginFail = true;
          return throwError(err);
        })
      )
      .subscribe({
        error: (err) => console.error('Subscription error:', err),
      });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
