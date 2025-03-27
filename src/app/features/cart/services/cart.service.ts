import { computed, effect, Injectable, signal } from '@angular/core';
import { ICartItem } from '../models/cart.model';
import { Product } from '../../product-listing/models/products.model';
import { CartApiService } from './cart-api.service';
import { IOrderModel } from '../models/order.model';
import { IUserCartLog } from '../models/userCartLog.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  ///

  constructor(private cartAPI: CartApiService) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems.set(JSON.parse(storedCart));
    }

    //whenevr the signal changes, the cache updates
    effect(() => {
      const cartState = this.cartItems();
      localStorage.setItem('cart', JSON.stringify(cartState));
    });
  }

  public ordered: boolean = false;
  public orderCount!: number;

  public cartItems = signal<ICartItem[]>([]);

  public countItems = computed(() => this.cartItems().length);

  public totalPrice = computed(() => {
    const items = this.cartItems();

    return items.reduce((prev, current) => {
      return prev + current.product.price * current.quantity;
    }, 0);
  });

  getCart = computed(() => this.cartItems());

  addProduct(product: Product) {
    this.cartItems.update((currentCartItems) => {
      const exists = currentCartItems.find(
        (item) => item.product.id === product.id
      );

      if (exists) {
        if (exists.quantity >= exists.product.rating.count) {
          alert(`${exists.product.title} is out of stock!`);
          return currentCartItems;
        } else {
          return currentCartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
      } else {
        return [...currentCartItems, { product, quantity: 1 }];
      }
    });
  }

  //id in signal not id of product
  removeItem(id: number) {
    this.cartItems.update((currentCartItems) =>
      currentCartItems.filter((_, index) => index !== id)
    );
  }

  checkStock(index: number) {
    this.cartItems.update((currentCartItems) => {
      if (index >= 0 && index < currentCartItems.length) {
        const item = currentCartItems[index];
        if (item.quantity >= item.product.rating.count) {
          alert(`You reached maximum amount of ${item.product.title}`);
          return currentCartItems.map((currentItem, currentIndex) =>
            currentIndex === index
              ? { ...item, quantity: item.product.rating.count }
              : currentItem
          );
        }
      }
      return currentCartItems;
    });
  }

  incQuantity(index: number) {
    this.cartItems.update((currentCartItems) => {
      if (index >= 0 && index < currentCartItems.length) {
        const item = currentCartItems[index];
        if (item.quantity >= item.product.rating.count) {
          alert(`You reached maximum amount of ${item.product.title}`);
          return currentCartItems;
        }

        return currentCartItems.map((currentItem, currentIndex) =>
          currentIndex === index
            ? { ...item, quantity: item.quantity + 1 }
            : currentItem
        );
      }
      return currentCartItems;
    });
  }

  decQuantity(idx: number) {
    this.cartItems.update((currentCartItems) => {
      if (idx >= 0 && idx < currentCartItems.length) {
        const item = currentCartItems[idx];

        if (item.quantity > 0) {
          const updatedItems = currentCartItems.map((currentItem, index) =>
            index === idx
              ? { ...currentItem, quantity: currentItem.quantity - 1 }
              : currentItem
          );

          return updatedItems.filter((item) => item.quantity > 0);
        }
      }

      return currentCartItems;
    });
  }

  clearCart() {
    this.cartItems.set([]);
  }

  placeOrder(finalPrice: number) {
    const products = this.cartItems().map((item) => ({
      productId: item.product.id,
      productQuantity: item.quantity,
    }));
    const user = JSON.parse(localStorage.getItem('user')!);
    const orderModel = {
      userId: user.userId,
      date: new Date(),
      items: products,
    };
    this.cartAPI.sendCart(orderModel).subscribe(() => {
      this.ordered = true;
      console.log('ordered boolean: ', this.ordered);
    });

    this.logOrder(user.userId, orderModel, finalPrice);
    this.clearCart();

    alert('Your order has been successfully sent!');

    console.log(orderModel);
  }

  logOrder(userId: number, orderModel: IOrderModel, finalPrice: number) {
    let orderNum: number;
    let prevOrders: IUserCartLog[] = [];

    if (`user#${userId} orders` in localStorage) {
      prevOrders = JSON.parse(localStorage.getItem(`user#${userId} orders`)!);
      orderNum = prevOrders.length + 1;
    } else {
      orderNum = 1;
    }
    let log: IUserCartLog = {
      order: orderModel,
      orderId: orderNum,
      totalPrice: finalPrice,
    };
    prevOrders.push(log);

    localStorage.setItem(`user#${userId} orders`, JSON.stringify(prevOrders));
  }
}
