import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Main landing page component of the e-commerce application.
 * Serves as the entry point and provides navigation to product discovery.
 *
 * Features:
 * - Displays featured content sections
 * - Provides direct navigation to product catalog
 * - Integrates with other home page components (Categories, JustLanded, Sale)
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}

  /**
   * Navigates to the products page when user clicks 'Discover Now'
   */
  onDiscoverNow() {
    this.router.navigate(['/products']);
  }
}
