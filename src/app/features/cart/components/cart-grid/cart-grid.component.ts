import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { SaleService } from '../../../sale/services/sale.service';

@Component({
  selector: 'app-cart-grid',
  templateUrl: './cart-grid.component.html',
  styleUrl: './cart-grid.component.scss',
})
export class CartGridComponent {
  discountCodes: string[] = [
    'lau10',
    'lu10',
    'ua10',
    'ndu10',
    'aub10',
    'inmind10',
  ];
  constructor(
    public cartService: CartService,
    public saleService: SaleService
  ) {}

  discountCode = '';
  isValid: boolean = false;
  finalPrice: number = this.cartService.totalPrice();
  showMessage: boolean = false;
  showTotal: boolean = false;
  onDec(i: number) {
    this.cartService.decQuantity(i);
    this.onDiscount();
  }

  onInc(i: number) {
    this.cartService.incQuantity(i);
    this.onDiscount();
  }
  onInputQuantity(i: number, input: number) {
    console.log('input: ', input);
    if (input === 0) {
      this.cartService.removeItem(i);
    } else {
      this.cartService.checkStock(i);
    }
    this.onDiscount();
  }
  onRemove(i: number) {
    this.cartService.removeItem(i);
  }

  onClear() {
    this.cartService.clearCart();
  }

  onOrder() {
    if (this.cartService.countItems() == 0) {
      alert(`Please add items to your cart!`);
    } else {
      this.cartService.placeOrder(this.finalPrice);

      this.finalPrice = 0;
      this.discountCode = '';
      this.showMessage = this.isValid = this.showTotal = false;
    }
  }

  checkCode() {
    this.showMessage = false;
    console.log(this.discountCode);
    if (this.discountCodes.includes(this.discountCode)) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
  onDiscount() {
    if (!this.discountCode) {
      this.finalPrice = this.cartService.totalPrice();
      this.showTotal = false;
    }
    if (this.discountCode && !this.isValid) {
      this.showMessage = true;
      this.finalPrice = this.cartService.totalPrice();
      this.showTotal = false;
    }
    if (this.isValid) {
      this.finalPrice = this.cartService.totalPrice() * 0.9;
      this.showTotal = true;
    }
  }

  onClearCode() {
    this.discountCode = '';
    this.showTotal = false;
    this.showMessage = false;
  }
}
