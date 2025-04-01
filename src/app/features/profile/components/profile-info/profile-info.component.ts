import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { userEmail, authError } from '../../../../core/auth/state/auth.selector';
import { AuthState } from '../../../../core/auth/state/auth.reducers';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit {
  currentUser!: number;
  userName!: string;
  emailError: string | null = null;

  // email$!: Observable<string | undefined>;
  email!: string | undefined;

  constructor(
    private profile: ProfileService,
    private store: Store<AuthState>
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
      },
    });
    
    // Subscribe to auth errors
    this.store.pipe(select(authError)).subscribe(error => {
      if (error && error.includes('email-already-in-use')) {
        this.emailError = 'This email is already in use. Please use a different email.';
      } else {
        this.emailError = null;
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
}
