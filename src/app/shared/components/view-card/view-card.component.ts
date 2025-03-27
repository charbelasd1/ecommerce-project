import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../features/product-listing/models/products.model';
import { CartService } from '../../../features/cart/services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { SaleService } from '../../../features/sale/services/sale.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.scss',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, DiscountPipe],
})
export class ViewCardComponent {
  @Input() productData!: Product;

  @Output() newId = new EventEmitter<number>();

  sendData() {
    this.newId.emit(this.productData.id);
  }

  constructor(
    private cartService: CartService,
    private saleService: SaleService
  ) {}

  add() {
    this.cartService.addProduct(this.productData);
  }
  isOnSale(): boolean {
    return this.saleService
      .saleItems()
      .some((item) => item.id === this.productData.id);
  }
}
