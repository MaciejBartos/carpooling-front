import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {
  AccountDetails,
  ChangeAccountStatusRequest, ChangePasswordAsAdminRequest,
  ChangePasswordRequest,
  EditAccountData,
  GetAccountsResponse, ResetPasswordRequest, SendResetPasswordEmailRequest, VerifyResetPasswordTokenRequest
} from '../../model/api-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl: string = environment.apiUrl;
  resource = '/account';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public changeAccountStatus(request: ChangeAccountStatusRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/admin/status', request, this.httpOptions);
  }

  public getAccountDetailsById(id: string | null): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(this.apiUrl + this.resource + '/details/' + id, this.httpOptions);
  }

  public getAccountDetailsByLogin(login: string): Observable<AccountDetails> {
    const request = {
      login,
    };
    return this.httpClient.post<AccountDetails>(this.apiUrl + this.resource + '/details', request, this.httpOptions);
  }

  public updateAccountInformation(account: EditAccountData): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/details', account, this.httpOptions);
  }

  public updateAccountPassword(request: ChangePasswordRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/password', request, this.httpOptions);
  }

  public updateAccountPasswordAsAdmin(request: ChangePasswordAsAdminRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/admin/password', request, this.httpOptions);
  }

  public getAccounts(searchCriteria: string): Observable<GetAccountsResponse> {
    const request = {
      searchCriteria
    };
    return this.httpClient.post<GetAccountsResponse>(this.apiUrl + this.resource + '/admin', request, this.httpOptions);
  }

  public sendResetPasswordEmail(request: SendResetPasswordEmailRequest): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl + this.resource + '/password/reset', request, this.httpOptions);
  }

  public resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/password/reset', request, this.httpOptions);
  }

  public verifyResetPasswordToken(request: VerifyResetPasswordTokenRequest): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl + this.resource + '/password/reset/verify', request, this.httpOptions);
  }
}
