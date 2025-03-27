import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUserCartLog } from '../../../cart/models/userCartLog.model';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { PreviousOrderDetailsComponent } from '../previous-order-details/previous-order-details.component';
import { ProfileService } from '../../services/profile.service';
import {
  currentUser,
  isLoggedIn,
} from '../../../../core/auth/state/auth.selector';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../../core/auth/state/auth.reducers';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider,
    RouterModule,
    PreviousOrderDetailsComponent,
  ],
})
export class PreviousOrdersComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  previousItems!: IUserCartLog[];
  currentUser!: number;
  selectedOrder?: number;

  constructor(
    private profile: ProfileService,
    private cdr: ChangeDetectorRef,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    if (`user` in localStorage) {
      this.currentUser = this.profile.getCurrentUser();
      this.previousItems = this.profile.getPreviousItems(this.currentUser);
    }
  }

  onSelectOrder(order: number): void {
    this.selectedOrder = order;
    console.log('selected order: ', order);
    this.cdr.detectChanges();
  }
}
