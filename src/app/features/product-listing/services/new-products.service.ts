// Import Angular's HTTP client for making API requests
import { HttpClient } from '@angular/common/http';
// Import Injectable decorator for dependency injection registration
import { Injectable } from '@angular/core';

// Import RxJS operators and types for reactive programming
import { map, Observable } from 'rxjs';
import { Product } from '../models/products.model';

// @Injectable decorator marks this service as available for dependency injection
// 'providedIn: root' makes this a singleton service available throughout the app
@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  // Dependency Injection: HttpClient is injected via constructor
  constructor(private http: HttpClient) {}

  // Returns an Observable of Product array from the mock data
  // Observable allows for async data handling and real-time updates
  getCharbel(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mock.data.json');
  }

  // Uses RxJS operators to transform the data stream
  // 'pipe' and 'map' operators filter the product array to find specific item
  getCharbelById(id: number): Observable<Product | undefined> {
    return this.getCharbel().pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }
}
