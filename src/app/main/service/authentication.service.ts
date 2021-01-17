import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfirmAccountRequest, SignIn, SignInResponse, SignUp} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl: string = environment.apiUrl;
  authenticationResource = '/auth';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public authenticateUser(signIn: SignIn): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(this.apiUrl + this.authenticationResource + '/signin', signIn, this.httpOptions);
  }

  public registerUser(signUp: SignUp): void {
    this.httpClient.post(this.apiUrl + this.authenticationResource + '/signup', signUp, this.httpOptions).subscribe();
  }

  public confirmAccount(confirmAccountRequest: ConfirmAccountRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.authenticationResource + '/confirm', confirmAccountRequest, this.httpOptions);
  }
}
