import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../../env/env.dev';
import { Product } from '../models/products.model';
@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling all product-related API communications.
 * Provides methods to fetch products from both the main API and mock data.
 *
 * Features:
 * - Fetches all products from the main API
 * - Combines products from multiple sources
 * - Retrieves individual product details
 * - Uses environment configuration for API endpoints
 */
export class ProductsApiService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches all products from the main API endpoint
   * @returns Observable of Product array
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiURL}products`);
  }

  /**
   * Combines products from both API and mock data
   * Uses forkJoin to fetch from multiple sources simultaneously
   * @returns Observable of tuple containing products from both sources
   */
  getNewProducts(): Observable<[Product[], Product[]]> {
    return forkJoin([
      this.getAllProducts(),
      this.http.get<Product[]>('assets/mock.data.json'),
    ]);
  }
  /**
   * Retrieves detailed information for a specific product
   * @param id The unique identifier of the product
   * @returns Observable of single Product
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiURL}products/${id}`);
  }
}
