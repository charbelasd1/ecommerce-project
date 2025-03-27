import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  constructor(private http: HttpClient) {}
  getAiah(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mock.data.json');
  }

  getAiahById(id: number): Observable<Product | undefined> {
    return this.getAiah().pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }
}
