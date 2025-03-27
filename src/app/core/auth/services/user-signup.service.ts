import { Injectable } from '@angular/core';
import { environment } from '../../../../env/env.dev';
import { HttpClient } from '@angular/common/http';
import { iSignUpRequest, iSignUpResponse } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

 
  constructor(private http: HttpClient) { }

  signup(req: iSignUpRequest): Observable<iSignUpResponse>{
    const signupURL = `${environment.authURL}User/SignUp()`;
    return this.http.post<iSignUpResponse>(signupURL, req)
  }


}
