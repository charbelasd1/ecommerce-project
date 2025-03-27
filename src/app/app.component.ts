import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './core/auth/state/auth.reducers';
import { refresh } from './core/auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (user) {
      this.store.dispatch(
        refresh({
          email: user.email,
          token: user.token,
          userId: user.userId,
        })
      );
    }
  }
  title = 'final-project';
}
