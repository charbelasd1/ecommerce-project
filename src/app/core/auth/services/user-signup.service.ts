import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iSignUpRequest, iSignUpResponse } from '../models/auth.model';
import { UserAuthService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private authService: UserAuthService) { }

  signup(req: iSignUpRequest): Observable<iSignUpResponse> {
    return this.authService.signup(req);
  }
}
