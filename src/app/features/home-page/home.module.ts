// Home Page Module: Main landing page of the e-commerce application
// Features: Product categories, new arrivals, and sale items display
// Components: Home, Categories, JustLandedProducts, and SaleProducts
// Includes: Material Grid List for responsive layout
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewCardComponent } from '../../shared/components/view-card/view-card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { JustLandedProductsComponent } from './components/just-landed-products/just-landed-products.component';
import { SaleProductsComponent } from './components/sale-products/sale-products.component';

@NgModule({
  declarations: [
    HomeComponent,
    JustLandedProductsComponent,
    CategoriesComponent,
    SaleProductsComponent,
  ],
  imports: [CommonModule, MatGridListModule, ViewCardComponent],
})
export class HomeModule {}
