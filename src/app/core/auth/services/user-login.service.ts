import { Injectable } from '@angular/core';
import { environment } from '../../../../env/env.dev';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest, ILoginResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}

  login(req: ILoginRequest): Observable<ILoginResponse> {
    const loginURL = `${environment.authURL}User/Login()`;
    return this.http
      .post<ILoginResponse>(loginURL, req)
      .pipe(tap((response) => console.log('API Response:', response)));
  }

  refresh(refreshToken: string): Observable<string> {
    return this.http.post<string>(
      `${environment.authURL}User/RefreshToken()`,
      refreshToken
    );
  }
}
