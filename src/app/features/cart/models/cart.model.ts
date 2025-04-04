import { Product } from '../../product-listing/models/products.model';

/**
 * Interface representing an item in the shopping cart
 * Combines product information with the desired quantity
 */
export interface ICartItem {
  /** The product details including id, name, price, etc. */
  product: Product;
  /** Number of units of this product in the cart */
  quantity: number;
}
