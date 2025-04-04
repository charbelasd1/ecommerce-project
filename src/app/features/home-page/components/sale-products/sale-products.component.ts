import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.scss',
})
/**
 * Component responsible for displaying and managing sale products section.
 * Provides navigation to the dedicated sale page.
 *
 * Features:
 * - Displays featured sale items
 * - Smooth scroll navigation to sale section
 * - Integration with main home page layout
 */
export class SaleProductsComponent {
  constructor(private router: Router) {}

  /**
   * Navigates to the sale page and scrolls to top smoothly
   */
  navigateToSale() {
    this.router.navigate(['/sale']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
