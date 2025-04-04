/**
 * @fileoverview Authentication State Management
 * Defines the structure and transformations of the authentication state.
 * Implements NgRx reducer pattern for predictable state updates.
 */

import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

/**
 * AuthState interface defines the shape of the authentication state
 * Includes user credentials, tokens, and error handling
 */
export interface AuthState {
  token: string | null;
  email: string | undefined;
  userId: string | null;
  error: string | null;
  validationErrors: {
    firstName?: string | undefined;
    lastName?: string | undefined;
    emailExists?: string | undefined;  // Changed from string | null
  } | null;
}

/**
 * Initial state of the authentication feature
 * All authentication-related data starts as null/undefined
 */
export const initialState: AuthState = {
  token: null,
  email: undefined,
  userId: null,
  error: null,
  validationErrors: null
};

/**
 * Authentication reducer
 * Handles all state transformations for auth-related actions
 * Maintains immutability and single source of truth
 */
export const authReducer = createReducer(
  initialState,
  
  // Handle successful login
  // Updates state with user credentials and clears any errors
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      email: action.email,
      token: action.token,
      userId: action.userId,
      error: null,
      validationErrors: null
    };
  }),

  // Handle signup form validation errors
  // Updates state with validation error messages
  on(AuthActions.signupValidationError, (state, { errors }) => {
    return {
      ...state,
      validationErrors: errors
    };
  }),

  // Handle signup process errors
  // Updates state with error message and handles email existence check
  on(AuthActions.signupError, (state, { error }) => {
    return {
      ...state,
      error: error,
      validationErrors: {
        ...state.validationErrors,
        emailExists: error.includes('email-already-in-use') 
          ? 'This email is already registered. Please use a different email.'
          : undefined  // Changed from null to undefined
      }
    };
  }),

  // Handle auth state refresh
  // Updates state with fresh credentials and clears errors
  on(AuthActions.refresh, (state, action) => {
    return {
      ...state,
      email: action.email,
      token: action.token,
      userId: action.userId,
      error: null,
      validationErrors: null
    };
  })
);
