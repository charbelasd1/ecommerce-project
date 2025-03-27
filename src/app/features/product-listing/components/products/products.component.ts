import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductsApiService } from '../../services/products-api.service';
import { CategoriesService } from '../../services/categories.service';
import { SortService } from '../../services/sort.service';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewProductsService } from '../../services/new-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  originalProductList: Product[] = [];
  productList!: Product[];
  searchlist!: Product[];
  searchValue = '';
  categories!: string[];
  currentCategory = 'All';
  sortOptions: string[] = [
    'Ascending',
    'Descending',
    'Price Ascending',
    'Price Descending',
    'Rate Ascending',
    'Rate Descending',
  ];
  currentSort = 'Default';

  constructor(
    private productsService: ProductsApiService,
    private cat: CategoriesService,
    private sortService: SortService,
    private http: HttpClient,
    private aiah: NewProductsService
  ) {}

  ngOnInit(): void {
    this.displayCategories();
    forkJoin([
      this.productsService.getAllProducts(),
      this.aiah.getAiah(),
    ]).subscribe({
      next: ([apiProducts, mockProducts]: [Product[], Product[]]) => {
        this.originalProductList = [...apiProducts, ...mockProducts];
        this.productList = this.originalProductList;
        this.searchlist = this.productList;
      },

      error: (err: any) => {
        alert(err.message);
      },
    });
  }

  displayCategories() {
    this.cat.getAllCategories().subscribe({
      next: (categories: string[]) => {
        const newCategory = 'skincare';
        this.categories = ['All', ...categories, newCategory];
      },
      error: (err: any) => {
        alert(err.message);
      },
    });
  }

  onCategoryChange(value: string) {
    if (value === 'All') {
      if (this.searchValue === '') this.productList = this.originalProductList;
      else {
        this.productList = this.originalProductList.filter((product) =>
          product.title.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }
      this.sortService.sort(this.currentSort, this.productList);

      this.searchlist = [...this.originalProductList];
    } else if (value === 'skincare') {
      this.aiah.getAiah().subscribe((products: Product[]) => {
        this.productList = products.filter((product) =>
          product.title.toLowerCase().includes(this.searchValue.toLowerCase())
        );
        this.sortService.sort(this.currentSort, this.productList);
        this.searchlist = [...products];
      });
    } else {
      let productsByCategory: Product[];
      this.cat.getProductsByCategory(value).subscribe((res: Product[]) => {
        productsByCategory = res;
        this.productList = productsByCategory.filter((product) =>
          product.title.toLowerCase().includes(this.searchValue.toLowerCase())
        );
        this.sortService.sort(this.currentSort, this.productList);
        this.searchlist = [...productsByCategory];

        this.currentCategory = value;
      });
    }
  }

  onSortChange(value: string) {
    this.currentSort = value;

    this.sortService.sort(this.currentSort, this.productList);
    this.searchlist = [...this.productList];
  }

  onSearch() {
    if (this.searchValue !== '') {
      this.productList = this.searchlist.filter((product) =>
        product.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.productList = this.searchlist;
    }
  }

  onClear() {
    this.searchValue = '';
    this.productList = this.searchlist;
  }
}
