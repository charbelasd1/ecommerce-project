/**
 * @fileoverview Signup Component
 * Manages new user registration with comprehensive form validation
 * and Firebase integration.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iSignUpRequest, iSignUpResponse } from '../../models/auth.model';
import { SignupService } from '../../services/user-signup.service';
import * as AuthActions from '../../state/auth.actions';
import { AuthState } from '../../state/auth.reducers';
import { getValidationErrors } from '../../state/auth.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
/**
 * SignupComponent handles new user registration
 * Features:
 * - Form validation with custom password requirements
 * - Real-time validation feedback
 * - Firebase authentication integration
 * - NgRx state management for errors
 */
export class SignupComponent implements OnInit {
  /** Reactive form for user registration */
  signupForm!: FormGroup;
  /** Regular expression for password validation
   * Requires:
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   * - Minimum length of 8 characters
   */
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  /** Tracks email existence error */
  emailExistsError: string | null = null;
  /** Stores form validation errors */
  validationErrors: any;
  /** Controls display of validation messages */
  showValidationErrors = false;

  constructor(
    private fb: FormBuilder,
    private auth: SignupService,
    private router: Router,
    private store: Store<AuthState>
  ) {}

  /** Form control getter for first name field */
  get firstName() {
    return this.signupForm.get('firstName');
  }

  /** Form control getter for last name field */
  get lastName() {
    return this.signupForm.get('lastName');
  }

  /** Form control getter for email field */
  get email() {
    return this.signupForm.get('email');
  }

  /** Form control getter for password field */
  get password() {
    return this.signupForm.get('password');
  }

  /**
   * Initializes the signup form and validation
   * Sets up form controls with validators
   * Subscribes to validation error state
   */
  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.StrongPasswordRegx)],
      ],
    });

    // Fixed state selection using the proper selector
    this.store.select(getValidationErrors).subscribe(errors => {
      if (errors) {
        this.validationErrors = errors;
      }
    });
  }

  /**
   * Handles form submission
   * Validates form data and attempts user registration
   * Dispatches appropriate actions based on validation results
   */
  onSubmit() {
    this.showValidationErrors = true;
    
    // Mark all fields as touched to trigger validation display
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });

    if (this.signupForm.valid) {
      const signupData: iSignUpRequest = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      // Validate empty fields
      const validationErrors: any = {};
      if (!signupData.firstName?.trim()) {
        validationErrors.firstName = 'First name cannot be empty';
      }
      if (!signupData.lastName?.trim()) {
        validationErrors.lastName = 'Last name cannot be empty';
      }

      if (Object.keys(validationErrors).length > 0) {
        this.store.dispatch(AuthActions.signupValidationError({ errors: validationErrors }));
        return;
      }

      this.auth.signup(signupData).subscribe({
        next: (res: iSignUpResponse) => {
          console.log('Sign Up Response: ', res);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          if (error.code === 'auth/email-already-in-use') {
            this.store.dispatch(AuthActions.signupError({ 
              error: 'auth/email-already-in-use' 
            }));
          }
        }
      });
    } else {
      // Form is invalid, show validation errors
      const validationErrors: any = {};
      if (!this.signupForm.value.firstName?.trim()) {
        validationErrors.firstName = 'First name is required';
        this.firstName?.setErrors({ 'required': true });
      }
      if (!this.signupForm.value.lastName?.trim()) {
        validationErrors.lastName = 'Last name is required';
        this.lastName?.setErrors({ 'required': true });
      }
      this.store.dispatch(AuthActions.signupValidationError({ errors: validationErrors }));
    }
  }
}
