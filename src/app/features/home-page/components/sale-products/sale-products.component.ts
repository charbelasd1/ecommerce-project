import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.component.html',
  styleUrl: './sale-products.component.scss',
})
export class SaleProductsComponent {
  constructor(private router: Router) {}
  navigateToSale() {
    this.router.navigate(['/sale']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
