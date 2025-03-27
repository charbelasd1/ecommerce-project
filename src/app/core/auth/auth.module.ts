import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducers';
import { AuthEffect } from './state/auth.effects';
import { UserAuthService } from './services/user-login.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AuthinterceptorsService } from './services/authinterceptors.service';
import { tokenInterceptor } from './services/token.interceptor';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffect]),
  ],
  providers: [
    UserAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorsService,
      multi: true,
    },
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
})
export class AuthModule {
  constructor() {
    console.log('loaded module auth');
  }
}
