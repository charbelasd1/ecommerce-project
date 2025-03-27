import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api.service';
import { Product } from '../../models/products.model';
import { CartService } from '../../../cart/services/cart.service';

import { SaleService } from '../../../sale/services/sale.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { NewProductsService } from '../../services/new-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  similarProducts$!: Observable<Product[]>;
  id!: any;
  product!: Product;
  stars!: number[];
  remaining!: number[];
  isHalf: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsApiService,
    private cartService: CartService,
    private aiah: NewProductsService,
    public saleService: SaleService,
    private categoryService: CategoriesService,
    private router: Router
  ) {}
  displayNewItem(id: number) {
    // console.log('new item: ', id);
    this.router.navigate(['/products/details', id]);

    this.id = id;
    // console.log(this.id);
    this.getSimilar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    // console.log('from oninit', this.id);
    this.getSimilar();
  }

  getSimilar() {
    if (this.id > 20) {
      this.getAiahProduct();
    } else {
      this.similarProducts$ = this.productsService.getProductById(this.id).pipe(
        tap((product) => {
          this.product = product;
          this.getRating(this.product.rating.rate);
        }),
        switchMap((product) =>
          this.categoryService
            .getProductsByCategory(product.category)
            .pipe(
              map((products) =>
                products.filter((p) => p.id !== this.product.id)
              )
            )
        )
      );
    }
  }
  getAiahProduct() {
    this.aiah.getAiahById(Number(this.id)).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.getRating(this.product.rating.rate);
          // console.log('Found product:', product);

          this.similarProducts$ = this.aiah
            .getAiah()
            .pipe(
              map((products) =>
                products.filter((p) => p.id !== this.product.id)
              )
            );
        } else {
          console.log('Product not found.');
        }
      },
    });
  }

  getRating(rating: number) {
    if (rating % 1 !== 0) {
      this.isHalf = true;
    }
    this.stars = Array.from({ length: Math.floor(rating) }, (_, i) => i + 1);
    if (this.isHalf) {
      this.remaining = Array.from(
        { length: 4 - Math.floor(rating) },
        (_, i) => i + 1
      );
    } else {
      this.remaining = Array.from(
        { length: 5 - Math.floor(rating) },
        (_, i) => i + 1
      );
    }
  }
  add() {
    this.cartService.addProduct(this.product);
  }
}
