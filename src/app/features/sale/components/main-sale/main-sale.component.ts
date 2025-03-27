import { Component } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { ViewCardComponent } from '../../../../shared/components/view-card/view-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';

@Component({
  selector: 'app-main-sale',
  templateUrl: './main-sale.component.html',
  styleUrl: './main-sale.component.scss',
  standalone: true,
  imports: [ViewCardComponent, MatDividerModule, DiscountPipe],
})
export class MainSaleComponent {
  constructor(public saleService: SaleService) {}
}
