import { ICartItem } from './cart.model';

export interface IOrderModel {
  userId: number;
  date: Date;
  items: {
    productId: number;
    productQuantity: number;
  }[];
}
