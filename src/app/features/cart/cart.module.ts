import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CartRoutingModule } from './cart-routing.module';
import { CurrencyPipe } from '@angular/common';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartGridComponent } from './components/cart-grid/cart-grid.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DiscountPipe } from '../../shared/pipes/discount.pipe';

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
