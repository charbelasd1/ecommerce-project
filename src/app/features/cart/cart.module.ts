// Cart Module: Manages shopping cart functionality
// Features: Product listing in cart, quantity management, price calculations
// Components: CartPageComponent (main cart view), CartGridComponent (cart items display)
// Includes: Material UI components for tables, forms, and buttons
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { DiscountPipe } from '../../shared/pipes/discount.pipe';
import { CartRoutingModule } from './cart-routing.module';
import { CartGridComponent } from './components/cart-grid/cart-grid.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

@NgModule({
  declarations: [CartPageComponent, CartGridComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatTableModule,
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    DiscountPipe,
  ],
})
export class CartModule {
  constructor() {
    console.log('loaded module cart');
  }
}
