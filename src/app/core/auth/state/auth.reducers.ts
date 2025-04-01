import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

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

export const initialState: AuthState = {
  token: null,
  email: undefined,
  userId: null,
  error: null,
  validationErrors: null
};

export const authReducer = createReducer(
  initialState,
  
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

  on(AuthActions.signupValidationError, (state, { errors }) => {
    return {
      ...state,
      validationErrors: errors
    };
  }),

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
