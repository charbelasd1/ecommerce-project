import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  constructor(private http: HttpClient) {}
  getCharbel(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mock.data.json');
  }

  getCharbelById(id: number): Observable<Product | undefined> {
    return this.getCharbel().pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }
}
