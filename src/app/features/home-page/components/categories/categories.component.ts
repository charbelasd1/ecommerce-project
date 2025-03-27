import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  image: string;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent {
  constructor(private router: Router) {}
  tiles: Tile[] = [
    {
      text: `Men's Clothing`,
      cols: 3,
      rows: 1.5,
      color: 'lightblue',
      image: '../../../../../assets/mens-clothing.jpeg',
    },
    {
      text: 'Electronics',
      cols: 1,
      rows: 4,
      color: 'lightgreen',
      image: '../../../../../assets/electronics.jpeg',
    },
    {
      text: 'Jewelery',
      cols: 1,
      rows: 1.5,
      color: 'lightpink',
      image: '../../../../../assets/jewelery.jpeg',
    },
    {
      text: `Women's Clothing`,
      cols: 2,
      rows: 1.5,
      color: '#DDBDF1',
      image: '../../../../../assets/womens-clothing.jpeg',
    },
  ];

  onNavigateCategory() {
    this.router.navigate(['/products']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
