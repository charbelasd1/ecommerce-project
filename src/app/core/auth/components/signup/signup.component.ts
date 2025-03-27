import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/user-signup.service';
import { Router } from '@angular/router';
import { iSignUpRequest, iSignUpResponse } from '../../models/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  constructor(
    private fb: FormBuilder,
    private auth: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.StrongPasswordRegx)],
      ],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted', this.signupForm.value);

      const signupData: iSignUpRequest = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      this.auth
        .signup(signupData)
        .subscribe({
          next: (res: iSignUpResponse) => {
            console.log('Sign Up Response: ', res);
            // Navigate to login page after successful signup
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Signup error:', error);
            // Handle signup errors (could add UI feedback here)
          }
        });
    } else {
      console.log('form is invalid');
    }
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }
}
