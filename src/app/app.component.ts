// Core Angular imports for component functionality and routing
import { Component, OnInit } from '@angular/core'; // Component decorator and lifecycle hook
import { Router } from '@angular/router'; // Angular router for navigation

// NgRx store imports for state management
import { Store } from '@ngrx/store'; // NgRx store for state management
import { AuthState } from './core/auth/state/auth.reducers'; // Auth state interface

@Component({
  selector: 'app-root',  // Component's HTML selector
  templateUrl: './app.component.html',  // External HTML template
  styleUrl: './app.component.scss',  // External SCSS styles
})
export class AppComponent implements OnInit {
  // Inject dependencies through constructor
  constructor(
    private store: Store<AuthState>,  // NgRx store for auth state
    private router: Router  // Router service for navigation
  ) {}
  
  // Lifecycle hook that runs on component initialization
  ngOnInit(): void {
    // Clear any existing authentication data from local storage
    localStorage.removeItem('user');  // Remove stored user data
    localStorage.removeItem('token');  // Remove stored auth token
    
    // Check current route and redirect to login if needed
    if (!this.router.url.includes('/login')) {
      this.router.navigate(['/login']);  // Navigate to login page
    }
  }
}
