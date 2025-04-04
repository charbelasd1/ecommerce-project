// Import core Angular functionality for component creation
import { Component } from '@angular/core';

// Import the Product model type for type safety and the service for data fetching
import { Product } from '../../../product-listing/models/products.model';
import { NewProductsService } from '../../../product-listing/services/new-products.service';

// Component decorator defines metadata for the component
@Component({
  // Selector used to embed this component in other templates
  selector: 'app-just-landed-products',
  // External template and style files for separation of concerns
  templateUrl: './just-landed-products.component.html',
  styleUrl: './just-landed-products.component.scss',
})
export class JustLandedProductsComponent {
  // State management: Component-level state to store products
  // The '!' is a non-null assertion operator indicating this will be initialized
  newItems!: Product[];
  
  // Dependency Injection: Angular injects the NewProductsService instance
  // 'private' makes the service available throughout the component
  constructor(private charbel: NewProductsService) {
    // Observable subscription: Reactive way to handle async data
    // When new products arrive, they're automatically assigned to newItems
    this.charbel.getCharbel().subscribe((products: Product[]) => {
      this.newItems = products;
    });
  }
}
