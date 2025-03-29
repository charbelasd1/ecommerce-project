import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../../../product-listing/models/products.model';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminMockService {
  private mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active', lastLogin: '2024-02-20' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'customer', status: 'active', lastLogin: '2024-02-19' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'customer', status: 'inactive', lastLogin: '2024-02-15' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'admin', status: 'active', lastLogin: '2024-02-21' },
    { id: 5, name: 'Alex Wilson', email: 'alex@example.com', role: 'customer', status: 'active', lastLogin: '2024-02-18' }
  ];

  private mockOrders: Order[] = [
    { id: '1001', date: '2024-02-20', customer: 'john@example.com', total: 159.99, status: 'completed', items: 2 },
    { id: '1002', date: '2024-02-19', customer: 'sarah@example.com', total: 85.00, status: 'pending', items: 1 },
    { id: '1003', date: '2024-02-18', customer: 'mike@example.com', total: 110.00, status: 'completed', items: 3 },
    { id: '1004', date: '2024-02-17', customer: 'alex@example.com', total: 29.99, status: 'cancelled', items: 1 },
    { id: '1005', date: '2024-02-16', customer: 'john@example.com', total: 165.00, status: 'completed', items: 2 }
  ];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return of(this.mockUsers);
  }

  getOrders(): Observable<Order[]> {
    return of(this.mockOrders);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mock.data.json');
  }

  addUser(user: User): Observable<User> {
    const newUser = { ...user, id: this.mockUsers.length + 1 };
    this.mockUsers.push(newUser);
    return of(newUser);
  }

  updateUser(user: User): Observable<User> {
    const index = this.mockUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.mockUsers[index] = user;
      return of(user);
    }
    return of(user); // In a real app, would return an error
  }

  deleteUser(id: number): Observable<boolean> {
    const initialLength = this.mockUsers.length;
    this.mockUsers = this.mockUsers.filter(user => user.id !== id);
    return of(this.mockUsers.length < initialLength);
  }

  addProduct(product: Product): Observable<Product> {
    // In a real app, this would make an API call
    // For mock, we'll just return the product with a new ID
    const newProduct = { ...product, id: Math.floor(Math.random() * 1000) + 100 };
    return of(newProduct);
  }

  updateProduct(product: Product): Observable<Product> {
    // In a real app, this would make an API call
    return of(product);
  }

  deleteProduct(id: number): Observable<boolean> {
    // In a real app, this would make an API call
    return of(true);
  }

  getActiveUsersCount(): Observable<number> {
    return of(this.mockUsers.filter(user => user.status === 'active').length);
  }

  getTotalUsersCount(): Observable<number> {
    return of(this.mockUsers.length);
  }

  getTotalOrdersCount(): Observable<number> {
    return of(this.mockOrders.length);
  }

  getRecentActivity(): Observable<{date: string, action: string, user: string}[]> {
    return of([
      { date: '2024-02-20', action: 'New Order', user: 'john@example.com' },
      { date: '2024-02-19', action: 'User Registration', user: 'sarah@example.com' },
      { date: '2024-02-18', action: 'Order Completed', user: 'mike@example.com' },
      { date: '2024-02-17', action: 'Product Added', user: 'emily@example.com' },
      { date: '2024-02-16', action: 'User Updated', user: 'emily@example.com' }
    ]);
  }
}