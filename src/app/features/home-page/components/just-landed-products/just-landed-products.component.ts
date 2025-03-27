import { Component } from '@angular/core';

import { Product } from '../../../product-listing/models/products.model';
import { NewProductsService } from '../../../product-listing/services/new-products.service';

@Component({
  selector: 'app-just-landed-products',
  templateUrl: './just-landed-products.component.html',
  styleUrl: './just-landed-products.component.scss',
})
export class JustLandedProductsComponent {
  newItems!: Product[];
  constructor(private aiah: NewProductsService) {
    this.aiah.getAiah().subscribe((products: Product[]) => {
      this.newItems = products;
    });
  }
}
