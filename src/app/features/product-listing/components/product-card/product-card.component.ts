import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/products.model';
import { CartService } from '../../../cart/services/cart.service';
import { SaleService } from '../../../sale/services/sale.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() productData!: Product;

  constructor(
    private cartService: CartService,
    public saleService: SaleService
  ) {}

  add() {
    this.cartService.addProduct(this.productData);
  }
}
