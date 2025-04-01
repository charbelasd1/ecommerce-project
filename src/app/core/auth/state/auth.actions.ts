import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Component] Login',
  props<{
    email: string;
    token: string;
    userId: string;
  }>()
);

export const logout = createAction('[Nav Component] Logout');

export const refresh = createAction(
  '[Application] Refresh',
  props<{ email: string; token: string; userId: string }>()
);

export const signupValidationError = createAction(
  '[Auth] Signup Validation Error',
  props<{
    errors: {
      firstName?: string;
      lastName?: string;
      emailExists?: string;
    }
  }>()
);

export const signupError = createAction(
  '[Auth] Signup Error',
  props<{ error: string }>()
);
