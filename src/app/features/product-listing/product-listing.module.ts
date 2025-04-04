// Product Listing Module: Core module for managing product display and interaction

// Angular core and common imports
import { CommonModule } from '@angular/common'; // For common directives and pipes
import { HttpClientModule } from '@angular/common/http'; // For API communication
import { NgModule } from '@angular/core'; // Angular module decorator
import { FormsModule } from '@angular/forms'; // For template-driven forms
import { RouterModule } from '@angular/router'; // For routing functionality

// Material UI component imports
import { MatButtonModule } from '@angular/material/button'; // Button components
import { MatDividerModule } from '@angular/material/divider'; // Divider component
import { MatFormFieldModule } from '@angular/material/form-field'; // Form field wrapper
import { MatIconModule } from '@angular/material/icon'; // Icon components
import { MatInputModule } from '@angular/material/input'; // Input components
import { MatOption, MatSelect } from '@angular/material/select'; // Select components

// Feature components imports
import { ProductCardComponent } from './components/product-card/product-card.component'; // Product card view
import { ProductDetailsComponent } from './components/product-details/product-details.component'; // Detailed view
import { ProductsComponent } from './components/products/products.component'; // Products grid

// Shared components and pipes
import { ViewCardComponent } from '../../shared/components/view-card/view-card.component'; // Reusable card
import { DiscountPipe } from '../../shared/pipes/discount.pipe'; // Price calculation pipe
import { InitialUpperPipe } from './pipes/initial-upper.pipe'; // Text formatting pipe

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductsComponent,
    InitialUpperPipe,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    DiscountPipe,
    ViewCardComponent,
    MatSelect,
    MatOption,
  ],
  exports: [ProductCardComponent, ProductsComponent],
})
export class ProductListingModule {}
