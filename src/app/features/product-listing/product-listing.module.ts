import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { InitialUpperPipe } from './pipes/initial-upper.pipe';
import { MatDividerModule } from '@angular/material/divider';
// import {MatCardContent, MatCardImage, MatCardModule} from '@angular/material/card'
// import {MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RouterModule } from '@angular/router';

import { DiscountPipe } from '../../shared/pipes/discount.pipe';
import { ViewCardComponent } from '../../shared/components/view-card/view-card.component';
import { MatOption, MatSelect } from '@angular/material/select';

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
