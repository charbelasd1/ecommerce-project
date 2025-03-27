import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { userEmail } from '../../../../core/auth/state/auth.selector';
import { AuthState } from '../../../../core/auth/state/auth.reducers';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit {
  currentUser!: number;
  userName!: string;

  // email$!: Observable<string | undefined>;
  email!: string | undefined;

  constructor(
    private profile: ProfileService,
    private store: Store<AuthState>
  ) {}
  ngOnInit(): void {
    this.currentUser = this.profile.getCurrentUser();

    // this.email$ = this.store.pipe(select(userEmail));
    this.store.pipe(select(userEmail)).subscribe({
      next: (email) => {
        this.email = email;
        if (this.email) {
          this.userName = this.email.split('@')[0];
        }
      },
      error: (error) => {
        console.error('Error fetching email:', error);
      },
    });
  }
}
