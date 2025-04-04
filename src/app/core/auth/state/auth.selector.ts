/**
 * @fileoverview Authentication State Selectors
 * Provides selectors for accessing authentication state in the application.
 * Implements NgRx selector pattern for efficient state selection and memoization.
 */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

/**
 * Base selector for auth feature state
 * Selects the entire auth state slice from the store
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth');

/**
 * Selector to check if user is logged in
 * @returns boolean indicating if user has valid authentication token
 */
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.token !== undefined && auth.token !== null
);

/**
 * Selector to check if user is logged out
 * @returns boolean indicating if user is not authenticated
 */
export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

/**
 * Selector for authentication token
 * @returns current auth token or null
 */
export const token = createSelector(selectAuthState, (auth) => auth.token);

/**
 * Selector for user's email
 * @returns authenticated user's email or undefined
 */
export const userEmail = createSelector(selectAuthState, (auth) => auth.email);

/**
 * Selector for current user ID
 * @returns authenticated user's ID or null
 */
export const currentUser = createSelector(
  selectAuthState,
  (auth) => auth.userId
);

/**
 * Selector for authentication errors
 * @returns current error message or null
 */
export const authError = createSelector(
  selectAuthState,
  (state) => state.error
);

/**
 * Selector for form validation errors
 * @returns object containing validation errors or null
 */
export const getValidationErrors = createSelector(
  selectAuthState,
  (state) => state.validationErrors
);
