import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  template: `
    <div class="admin-products">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Product Management</mat-card-title>
          <mat-card-subtitle>Manage your store's products</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="actions">
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon> Add New Product
            </button>
          </div>
          
          <table mat-table [dataSource]="products" class="products-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let product">{{product.name}}</td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let product">{{product.price | currency}}</td>
            </ng-container>

            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef>Stock</th>
              <td mat-cell *matCellDef="let product">{{product.stock}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let product">
                <button mat-icon-button color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .admin-products {
      padding: 20px;
    }
    .actions {
      margin-bottom: 20px;
    }
    .products-table {
      width: 100%;
    }
  `]
})
export class AdminProductsComponent {
  displayedColumns: string[] = ['name', 'price', 'stock', 'actions'];
  products = [
    { name: 'Bomber Jacket', price: 99.99, stock: 50 },
    { name: 'Leather Jacket', price: 149.99, stock: 30 },
    { name: 'Baggy jeans', price: 199.99, stock: 20 }
  ];
}