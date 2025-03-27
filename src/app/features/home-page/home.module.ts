import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { JustLandedProductsComponent } from './components/just-landed-products/just-landed-products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SaleProductsComponent } from './components/sale-products/sale-products.component';
import { ViewCardComponent } from '../../shared/components/view-card/view-card.component';

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
