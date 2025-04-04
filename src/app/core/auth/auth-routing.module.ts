/**
 * @module AuthRoutingModule
 * Manages the routing configuration for authentication-related features.
 * 
 * Route Structure:
 * - Root path ('/'): Maps to LoginComponent for user authentication
 * - '/signup': Maps to SignupComponent for new user registration
 * 
 * Features:
 * - Lazy-loaded module for optimized performance
 * - Child routes configuration for auth feature
 * - Seamless navigation between login and signup
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

/**
 * Authentication route configuration.
 * Defines the available paths within the auth module.
 */
const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent, // Default auth route displays login form
  },
  { 
    path: 'signup', 
    component: SignupComponent, // Route for new user registration
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
