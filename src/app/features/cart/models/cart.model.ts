import { Product } from '../../product-listing/models/products.model';

export interface ICartItem {
  product: Product;
  quantity: number;
}
