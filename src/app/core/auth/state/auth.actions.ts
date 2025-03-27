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
