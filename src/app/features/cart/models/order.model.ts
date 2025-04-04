
/**
 * Interface representing an order in the e-commerce system
 * Contains essential information about a customer's purchase order
 */
export interface IOrderModel {
  /** Unique identifier of the user who placed the order */
  userId: number;
  /** Timestamp when the order was created */
  date: Date;
  /** Array of items in the order, each containing product ID and quantity */
  items: {
    /** Unique identifier of the product */
    productId: number;
    /** Number of units ordered for this product */
    productQuantity: number;
  }[];
}
