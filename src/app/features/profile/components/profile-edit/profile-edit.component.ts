import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { UserAuthService } from '../../../../core/auth/services/user-login.service';
import { IUserProfile, ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  reAuthForm: FormGroup;
  showValidationErrors = false;
  email: string | undefined;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentUser: firebase.User | null = null;
  emailUpdateRequired = false;
  newEmail: string = '';
  reauthRequired = false;
  @Output() profileUpdated = new EventEmitter<IUserProfile>();
  @Output() editCancelled = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: UserAuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [{value: '', disabled: true}],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
    });
    this.reAuthForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  // Add getter methods for form controls
  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get address() { return this.profileForm.get('address'); }
  get city() { return this.profileForm.get('city'); }
  get state() { return this.profileForm.get('state'); }
  get zipCode() { return this.profileForm.get('zipCode'); }

  // Toggle email update form visibility
  toggleEmailUpdate() {
    this.emailUpdateRequired = true;
  }

  // Cancel any ongoing operation (email update or re-authentication)
  cancelOperation() {
    this.emailUpdateRequired = false;
    this.reauthRequired = false;
    this.errorMessage = null;
  }

  // Update email address
  updateEmail() {
    if (!this.newEmail) {
      this.errorMessage = 'Please enter a new email address';
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.newEmail)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // For security, require re-authentication before changing email
    this.reauthRequired = true;
    this.emailUpdateRequired = false;
  }

  // Re-authenticate user before sensitive operations
  reAuthenticate() {
    if (this.reAuthForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    // In a real app, you would call Firebase reauthenticate method here
    // For this demo, we'll simulate success
    setTimeout(() => {
      this.loading = false;
      this.reauthRequired = false;
      
      if (this.newEmail) {
        // Simulate email update success
        this.successMessage = 'Email updated successfully';
        this.email = this.newEmail;
        this.profileForm.get('email')?.setValue(this.newEmail);
        this.newEmail = '';
      }
    }, 1500);
  }

  onSubmit() {
    this.showValidationErrors = true;
    
    if (this.profileForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      
      // Get form values
      const formValues = this.profileForm.getRawValue();
      
      // Create profile data object
      const profileData: IUserProfile = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: formValues.address,
        city: formValues.city,
        state: formValues.state,
        zipCode: formValues.zipCode
      };
      
      try {
        // Update profile in service
        this.profileService.updateProfile(profileData);
         
        // Show success message
        this.successMessage = 'Profile updated successfully';
        
        // Emit the updated profile data
        this.profileUpdated.emit(profileData);
        
        // Reset loading state
        this.loading = false;
      } catch (error) {
        this.errorMessage = 'Failed to update profile';
        this.loading = false;
        console.error('Profile update error:', error);
      }
    }
  }

  // Add a cancel method
  cancelEdit() {
    this.editCancelled.emit();
  }

  ngOnInit(): void {
    this.loading = true;
    
    // Get current Firebase user
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        if (user) {
          this.email = user.email || undefined;
          
          // Set email in form
          this.profileForm.get('email')?.setValue(this.email);
          
          // Parse displayName to get first and last name
          if (user.displayName) {
            const nameParts = user.displayName.split(' ');
            if (nameParts.length >= 2) {
              this.profileForm.get('firstName')?.setValue(nameParts[0]);
              this.profileForm.get('lastName')?.setValue(nameParts.slice(1).join(' '));
            }
          }
          
          // Load additional profile data from local storage if available
          const profileData = this.profileService.getProfileData();
          if (profileData) {
            // Patch all form fields
            this.profileForm.patchValue({
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              address: profileData.address,
              city: profileData.city,
              state: profileData.state,
              zipCode: profileData.zipCode
            });
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.errorMessage = 'Failed to load user profile';
        this.loading = false;
      }
    });
  }
}
