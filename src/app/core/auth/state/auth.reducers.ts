import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface AuthState {
  email: string | undefined;
  token: string | undefined;
  userId: number | undefined;
}

export const initialAuthState: AuthState = {
  email: undefined,
  token: undefined,
  userId: undefined,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      email: action.email,
      token: action.token,
      userId: action.userId,
    };
  }),

  on(AuthActions.logout, (state) => {
    return {
      ...initialAuthState,
    };
  }),
  on(AuthActions.refresh, (state, action) => {
    return {
      ...state,
      email: action.email,
      token: action.token,
      userId: action.userId,
    };
  })
);
