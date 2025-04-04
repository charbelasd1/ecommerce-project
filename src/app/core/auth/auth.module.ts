/**
 * @module AuthModule
 * Core authentication module that provides comprehensive user authentication and authorization.
 * 
 * Features:
 * - User authentication (login/signup) via Firebase Authentication
 * - State management using NgRx for auth state
 * - HTTP interceptors for automatic token management
 * - Route guards for protected routes
 * - Admin role management
 * 
 * Architecture:
 * - Uses Firebase Authentication for secure user management
 * - Implements NgRx for centralized state management
 * - Provides HTTP interceptors for automatic token injection
 * - Includes route guards for protected routes
 * 
 * Components:
 * - LoginComponent: Handles user login
 * - SignupComponent: Manages new user registration
 * 
 * Services:
 * - UserAuthService: Core authentication logic
 * - AuthinterceptorsService: Automatic token management
 * 
 * State Management:
 * - auth.actions: Authentication-related actions
 * - auth.effects: Side effects for auth operations
 * - auth.reducers: State updates for auth
 * - auth.selectors: Selectors for auth state
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../../env/env.dev';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthinterceptorsService } from './services/authinterceptors.service';
import { tokenInterceptor } from './services/token.interceptor';
import { UserAuthService } from './services/user-login.service';
import { AuthEffect } from './state/auth.effects';
import { authReducer } from './state/auth.reducers';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffect]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
