import { IOrderModel } from './order.model';

export interface IUserCartLog {
  order: IOrderModel;
  orderId: number;
  totalPrice: number;
}
