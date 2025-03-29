import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../../../core/auth/services/user-login.service';
import { AdminMockService } from '../services/admin-mock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-dashboard">
      <h1 class="admin-title">Admin Features</h1>
      
      <div class="admin-nav">
        <button mat-raised-button color="primary" routerLink="/profile/admin">
          <mat-icon>dashboard</mat-icon> Dashboard
        </button>
        <button mat-raised-button color="primary" routerLink="/profile/admin/products">
          <mat-icon>inventory_2</mat-icon> Manage Products
        </button>
        <button mat-raised-button color="primary" routerLink="/profile/admin/users">
          <mat-icon>people</mat-icon> Manage Users
        </button>
      </div>
      
      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-card-title>Admin Dashboard</mat-card-title>
          <mat-card-subtitle>Manage your application</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="stats-container">
            <div class="stat-item">
              <h3>Total Users</h3>
              <p>{{ totalUsers }}</p>
            </div>
            <div class="stat-item">
              <h3>Active Users</h3>
              <p>{{ activeUsers }}</p>
            </div>
            <div class="stat-item">
              <h3>Total Orders</h3>
              <p>{{ totalOrders }}</p>
            </div>
          </div>

          <h3>Recent Activity</h3>
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
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 20px;
    }
    .admin-title {
      margin-bottom: 20px;
      color: #333;
    }
    .admin-nav {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .dashboard-card {
      margin-bottom: 20px;
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
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    .stat-item h3 {
      margin: 0;
      color: #666;
      font-size: 16px;
    }
    .stat-item p {
      margin: 10px 0 0;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    .activity-table {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  activeUsers = 0;
  totalOrders = 0;
  displayedColumns: string[] = ['date', 'action', 'user'];
  recentActivity = [
    { date: '2024-02-20', action: 'New Order', user: 'john@example.com' },
    { date: '2024-02-19', action: 'User Registration', user: 'sarah@example.com' },
    { date: '2024-02-18', action: 'Order Completed', user: 'mike@example.com' }
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
  }
}