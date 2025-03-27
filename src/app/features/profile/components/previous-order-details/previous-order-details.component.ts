import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { IUserCartLog } from '../../../cart/models/userCartLog.model';

import { ProfileService } from '../../services/profile.service';
import { Product } from '../../../product-listing/models/products.model';
import { ProductsApiService } from '../../../product-listing/services/products-api.service';
import { CommonModule } from '@angular/common';
import { SaleService } from '../../../sale/services/sale.service';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';
import { forkJoin, map, Observable } from 'rxjs';
import { NewProductsService } from '../../../product-listing/services/new-products.service';

@Component({
  selector: 'app-previous-order-details',
  standalone: true,
  imports: [CommonModule, DiscountPipe],
  templateUrl: './previous-order-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './previous-order-details.component.scss',
})
export class PreviousOrderDetailsComponent implements OnChanges {
  @Input() orderId!: number;
  @Input() userCart!: IUserCartLog[];
  @Input() userId!: number;
  orderLog!: IUserCartLog;
  itemList!: {
    productId: number;
    productQuantity: number;
  }[];
  productList$!: Observable<
    {
      productId: number;
      product: Product | { image: string; price: number };
      quantity: number;
    }[]
  >;
  ngOnInit() {
    this.getOrderLog(this.orderId);
    this.itemList = this.orderLog.order.items;
    this.productList$ = this.getProductList(this.itemList);
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.orderId = changes['orderId'].currentValue;
    // this.userCart = changes['userCart'].currentValue;
    // this.userId = changes['userId'].currentValue;
    this.getOrderLog(this.orderId);
    this.itemList = this.orderLog.order.items;
    this.productList$ = this.getProductList(this.itemList);
  }
  constructor(
    public profile: ProfileService,
    public productService: ProductsApiService,
    public saleService: SaleService,
    private aiah: NewProductsService
  ) {}

  // got {product: id, quantity}
  getOrderLog(index: number) {
    if (this.orderId) this.orderLog = this.userCart[index - 1];
  }

  getProductList(
    itemList: {
      productId: number;
      productQuantity: number;
    }[]
  ): Observable<
    {
      productId: number;
      product: Product | { image: string; price: number };
      quantity: number;
    }[]
  > {
    const productObservables = itemList.map((item) => {
      const productObservable =
        item.productId > 20
          ? this.aiah.getAiahById(item.productId)
          : this.productService.getProductById(item.productId);

      return productObservable.pipe(
        map((product: Product | undefined) => ({
          productId: item.productId,
          product: product || { image: '', price: 0 },
          quantity: item.productQuantity,
        }))
      );
    });

    return forkJoin(productObservables);
  }
}
