import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../../../core/auth/state/auth.reducers';
import { authError, userEmail } from '../../../../core/auth/state/auth.selector';
import { IUserProfile, ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit {
  currentUser!: number;
  userName!: string;
  emailError: string | null = null;
  email!: string | undefined;
  profileData: IUserProfile | null = null;
  showEditForm = false; // New property to toggle edit form visibility

  constructor(
    private profile: ProfileService,
    private store: Store<AuthState>,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.currentUser = this.profile.getCurrentUser();

    // Subscribe to email from store
    this.store.pipe(select(userEmail)).subscribe({
      next: (email) => {
        this.email = email;
        if (this.email) {
          // Extract username part from email
          const username = this.email.split('@')[0];
          
          // Extract first name - either by splitting at numbers or capitalizing
          this.userName = this.extractFirstName(username);
        }
      },
      error: (error) => {
        console.error('Error fetching email:', error);
      }
    });
    
    // Load profile data
    this.profileData = this.profile.getProfileData();
    
    // Subscribe to auth errors
    this.store.pipe(select(authError)).subscribe({
      next: (error) => {
        if (error && error.includes('email-already-in-use')) {
          this.emailError = 'This email is already in use. Please use a different email.';
        } else {
          this.emailError = null;
        }
      },
      error: (err) => {
        console.error('Error handling auth error:', err);
      }
    });
  }

  // Helper method to extract and format first name
  private extractFirstName(username: string): string {
    // Try to extract letters before any numbers
    const nameMatch = username.match(/^([a-zA-Z]+)/);
    let firstName = username;
    
    if (nameMatch && nameMatch[1]) {
      firstName = nameMatch[1];
    }
    
    // Capitalize first letter
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  // Toggle edit form visibility
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  // Handle profile update event from edit component
  onProfileUpdated(updatedProfile: IUserProfile): void {
    this.profileData = updatedProfile;
    this.showEditForm = false; // Hide edit form after update
  }

  // Handle cancel event from edit component
  onEditCancelled(): void {
    this.showEditForm = false;
  }
}