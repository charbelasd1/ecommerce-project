/**
 * @fileoverview Authentication Actions
 * Defines all NgRx actions related to authentication state management.
 * These actions represent all possible authentication-related events in the application.
 */

import { createAction, props } from '@ngrx/store';

/**
 * Login action
 * Dispatched when user successfully authenticates
 * @param email - User's email address
 * @param token - Authentication token from Firebase
 * @param userId - Unique user identifier
 */
export const login = createAction(
  '[Login Component] Login',
  props<{
    email: string;
    token: string;
    userId: string;
  }>()
);

/**
 * Logout action
 * Dispatched when user logs out of the application
 */
export const logout = createAction('[Nav Component] Logout');

/**
 * Refresh action
 * Dispatched when refreshing authentication state
 * Used for persisting auth state across page reloads
 */
export const refresh = createAction(
  '[Application] Refresh',
  props<{ email: string; token: string; userId: string }>()
);

/**
 * Signup Validation Error action
 * Dispatched when form validation fails during signup
 * @param errors - Object containing validation errors for different fields
 */
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

/**
 * Signup Error action
 * Dispatched when signup process fails
 * @param error - Error message from Firebase or validation
 */
export const signupError = createAction(
  '[Auth] Signup Error',
  props<{ error: string }>()
);
