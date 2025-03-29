import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../../../core/auth/services/user-login.service';
import { Order } from '../models/order.model';
import { AdminMockService } from '../services/admin-mock.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-dashboard">
      <h1 class="admin-title">Admin Features</h1>
      
      <div class="admin-nav">
        <button mat-raised-button class="accent-button" routerLink="/profile/admin">
          <mat-icon>dashboard</mat-icon> Dashboard
        </button>
        <button mat-raised-button class="accent-button" routerLink="/profile/admin/products">
          <mat-icon>inventory_2</mat-icon> Manage Products
        </button>
        <button mat-raised-button class="accent-button" routerLink="/profile/admin/users">
          <mat-icon>people</mat-icon> Manage Users
        </button>
      </div>
      
      <div class="dashboard-grid">
        <!-- Overview Card -->
        <mat-card class="dashboard-card overview-card">
          <mat-card-header>
            <mat-card-title>Dashboard Overview</mat-card-title>
            <mat-card-subtitle>Key metrics at a glance</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="stats-container">
              <div class="stat-item">
                <mat-icon class="stat-icon">people</mat-icon>
                <h3>Total Users</h3>
                <p>{{ totalUsers }}</p>
                <mat-progress-bar mode="determinate" [value]="(totalUsers/10)*100"></mat-progress-bar>
              </div>
              <div class="stat-item">
                <mat-icon class="stat-icon">person</mat-icon>
                <h3>Active Users</h3>
                <p>{{ activeUsers }}</p>
                <mat-progress-bar mode="determinate" [value]="(activeUsers/totalUsers)*100"></mat-progress-bar>
              </div>
              <div class="stat-item">
                <mat-icon class="stat-icon">shopping_cart</mat-icon>
                <h3>Total Orders</h3>
                <p>{{ totalOrders }}</p>
                <mat-progress-bar mode="determinate" [value]="(totalOrders/10)*100"></mat-progress-bar>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Orders Card -->
        <mat-card class="dashboard-card orders-card">
          <mat-card-header>
            <mat-card-title>Recent Orders</mat-card-title>
            <mat-card-subtitle>Latest customer purchases</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="recentOrders" class="orders-table">
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef>Order ID</th>
                <td mat-cell *matCellDef="let order">{{ order.id }}</td>
              </ng-container>
              
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Date</th>
                <td mat-cell *matCellDef="let order">{{ order.date }}</td>
              </ng-container>
              
              <ng-container matColumnDef="customer">
                <th mat-header-cell *matHeaderCellDef>Customer</th>
                <td mat-cell *matCellDef="let order">{{ order.customer }}</td>
              </ng-container>
              
              <ng-container matColumnDef="total">
                <th mat-header-cell *matHeaderCellDef>Total</th>
                <td mat-cell *matCellDef="let order">{{ order.total | currency }}</td>
              </ng-container>
              
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let order">
                  <mat-chip [ngClass]="getStatusClass(order.status)">{{ order.status }}</mat-chip>
                </td>
              </ng-container>
              
              <tr mat-header-row *matHeaderRowDef="orderColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: orderColumns;"></tr>
            </table>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-button class="accent-text-button">View All Orders</button>
          </mat-card-actions>
        </mat-card>

        <!-- Recent Activity Card -->
        <mat-card class="dashboard-card activity-card">
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
            <mat-card-subtitle>Latest system events</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="recentActivity" class="activity-table">
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Date</th>
                <td mat-cell *matCellDef="let item">{{ item.date }}</td>
              </ng-container>

            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef>Action</th>
              <td mat-cell *matCellDef="let item">{{ item.action }}</td>
            </ng-container>

            <ng-container matColumnDef="user">
              <th mat-header-cell *matHeaderCellDef>User</th>
              <td mat-cell *matCellDef="let item">{{ item.user }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <!-- Inventory Status Card -->
      <mat-card class="dashboard-card inventory-card">
        <mat-card-header>
          <mat-card-title>Inventory Status</mat-card-title>
          <mat-card-subtitle>Product stock levels</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="inventory-items">
            <div class="inventory-item" *ngFor="let item of inventoryItems">
              <div class="inventory-header">
                <span class="inventory-name">{{ item.name }}</span>
                <span class="inventory-stock" [ngClass]="getStockClass(item.stock)">{{ item.stock }} in stock</span>
              </div>
              <mat-progress-bar mode="determinate" [value]="(item.stock/item.capacity)*100"></mat-progress-bar>
              <div class="inventory-footer">
                <span class="inventory-category">{{ item.category }}</span>
                <button mat-icon-button matTooltip="Restock" class="accent-icon-button">
                  <mat-icon>add_shopping_cart</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button class="accent-text-button">Manage Inventory</button>
        </mat-card-actions>
      </mat-card>

      <!-- Quick Actions Card -->
      <mat-card class="dashboard-card actions-card">
        <mat-card-header>
          <mat-card-title>Quick Actions</mat-card-title>
          <mat-card-subtitle>Common administrative tasks</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="quick-actions">
            <button mat-raised-button class="accent-button action-button">
              <mat-icon>add_circle</mat-icon> Add New Product
            </button>
            <button mat-raised-button class="accent-button action-button">
              <mat-icon>person_add</mat-icon> Add New User
            </button>
            <button mat-raised-button class="accent-button action-button">
              <mat-icon>receipt</mat-icon> Generate Reports
            </button>
            <button mat-raised-button class="accent-button action-button">
              <mat-icon>settings</mat-icon> System Settings
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 20px;
    }
    .admin-title {
      margin-bottom: 20px;
      color: #333;
      font-family: 'Lexend Tera', sans-serif;
    }
    .admin-nav {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .accent-button {
      background-color: var(--accent-color);
      color: white;
      transition: background-color 0.3s ease;
    }
    .accent-button:hover {
      background-color: #e66a20;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .accent-text-button {
      color: var(--accent-color);
      font-weight: 500;
    }
    .accent-icon-button {
      color: var(--accent-color);
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .dashboard-card {
      height: 100%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .dashboard-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    .overview-card {
      grid-column: span 2;
    }
    .stats-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 20px 0;
    }
    .stat-item {
      text-align: center;
      padding: 20px;
      background-color: var(--warm-background-color);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    .stat-item:hover {
      transform: translateY(-3px);
    }
    .stat-icon {
      color: var(--accent-color);
      font-size: 28px;
      height: 28px;
      width: 28px;
      margin-bottom: 10px;
    }
    .stat-item h3 {
      margin: 0;
      color: #666;
      font-size: 16px;
    }
    .stat-item p {
      margin: 10px 0;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    .activity-table, .orders-table {
      width: 100%;
      margin-top: 10px;
    }
    .inventory-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 15px;
    }
    .inventory-item {
      padding: 15px;
      background-color: var(--warm-background-color);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .inventory-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .inventory-name {
      font-weight: 500;
    }
    .inventory-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      font-size: 12px;
      color: #666;
    }
    .inventory-category {
      background-color: #f0f0f0;
      padding: 3px 8px;
      border-radius: 12px;
    }
    .stock-low {
      color: #f44336;
    }
    .stock-medium {
      color: #ff9800;
    }
    .stock-high {
      color: #4caf50;
    }
    .status-completed {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .status-pending {
      background-color: #fff8e1;
      color: #f57f17;
    }
    .status-cancelled {
      background-color: #ffebee;
      color: #c62828;
    }
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    .action-button {
      width: 100%;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  activeUsers = 0;
  totalOrders = 0;
  displayedColumns: string[] = ['date', 'action', 'user'];
  orderColumns: string[] = ['id', 'date', 'customer', 'total', 'status'];
  recentActivity = [
    { date: '2024-02-20', action: 'New Order', user: 'john@example.com' },
    { date: '2024-02-19', action: 'User Registration', user: 'sarah@example.com' },
    { date: '2024-02-18', action: 'Order Completed', user: 'mike@example.com' },
    { date: '2024-02-17', action: 'Product Added', user: 'emily@example.com' },
    { date: '2024-02-16', action: 'User Updated', user: 'emily@example.com' }
  ];
  
  recentOrders: Order[] = [];
  
  inventoryItems = [
    { name: 'Smartphone X', stock: 45, capacity: 100, category: 'Electronics' },
    { name: 'Designer Watch', stock: 12, capacity: 50, category: 'Accessories' },
    { name: 'Premium Headphones', stock: 8, capacity: 30, category: 'Electronics' },
    { name: 'Leather Wallet', stock: 23, capacity: 40, category: 'Accessories' }
  ];

  constructor(
    private authService: UserAuthService,
    private adminService: AdminMockService,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch data from our mock service
    this.adminService.getTotalUsersCount().subscribe(count => {
      this.totalUsers = count;
    });
    
    this.adminService.getActiveUsersCount().subscribe(count => {
      this.activeUsers = count;
    });
    
    this.adminService.getTotalOrdersCount().subscribe(count => {
      this.totalOrders = count;
    });
    
    this.adminService.getRecentActivity().subscribe(activity => {
      this.recentActivity = activity;
    });
    
    this.adminService.getOrders().subscribe(orders => {
      this.recentOrders = orders.slice(0, 5); // Get only the first 5 orders
    });
  }
  
  getStatusClass(status: string): string {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }
  
  getStockClass(stock: number): string {
    if (stock < 10) return 'stock-low';
    if (stock < 20) return 'stock-medium';
    return 'stock-high';
  }
}