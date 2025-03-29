import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { refresh } from './core/auth/state/auth.actions';
import { AuthState } from './core/auth/state/auth.reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AuthState>,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Clear any existing authentication data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Redirect to login page if not already there
    if (!this.router.url.includes('/login')) {
      this.router.navigate(['/login']);
    }
  }
}
