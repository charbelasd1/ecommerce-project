import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../../env/env.dev';
@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiURL}products`);
  }

  getNewProducts(): Observable<[Product[], Product[]]> {
    return forkJoin([
      this.getAllProducts(),
      this.http.get<Product[]>('assets/mock.data.json'),
    ]);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiURL}products/${id}`);
  }
}
