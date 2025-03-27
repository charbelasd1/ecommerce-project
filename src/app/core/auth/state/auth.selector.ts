import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';
// import { AppState } from "./app.state";
// import { ILoginState } from "./auth.reducers";

// export const selectLoginState = (state: AppState) => state.userAuth;

// export const selectUser = createSelector(
//   selectLoginState,
//   (state: ILoginState)=>
//     state.User

// )

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.token !== undefined && auth.token !== null
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

export const token = createSelector(selectAuthState, (auth) => auth.token);
export const userEmail = createSelector(selectAuthState, (auth) => auth.email);
export const currentUser = createSelector(
  selectAuthState,
  (auth) => auth.userId
);
