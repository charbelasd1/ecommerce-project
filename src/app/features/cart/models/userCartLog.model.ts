import { IOrderModel } from './order.model';

/**
 * Interface representing a user's cart log entry
 * Tracks order details and total price for user purchase history
 */
export interface IUserCartLog {
  /** Complete order information including items and user details */
  order: IOrderModel;
  /** Unique identifier for the order */
  orderId: number;
  /** Total monetary value of all items in the order */
  totalPrice: number;
}
