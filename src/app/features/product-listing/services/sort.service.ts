import { Injectable } from '@angular/core';
import { environment } from '../../../../env/env.dev';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  sortAlph(products: Product[], order: 'asc' | 'desc'): void {
    if (order == 'asc') {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      products.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  sortPrice(products: Product[], order: 'asc' | 'desc'): void {
    if (order == 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else {
      products.sort((a, b) => b.price - a.price);
    }
  }

  sortRating(products: Product[], order: 'asc' | 'desc'): void {
    if (order == 'asc') {
      products.sort((a, b) => a.rating.rate - b.rating.rate);
    } else {
      products.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }

  sort(value: string, products: Product[]): void {
    switch (value) {
      case 'Ascending':
        this.sortAlph(products, 'asc');
        break;

      case 'Descending':
        this.sortAlph(products, 'desc');
        break;

      case 'Price Ascending':
        this.sortPrice(products, 'asc');
        break;

      case 'Price Descending':
        this.sortPrice(products, 'desc');
        break;

      case 'Rate Ascending':
        this.sortRating(products, 'asc');
        break;

      case 'Rate Descending':
        this.sortRating(products, 'desc');
        break;

      default:
    }
  }
}
