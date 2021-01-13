import {Injectable} from '@angular/core';
import {GetAccountsResponse} from '../../model/api-model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '../service/account.service';

@Injectable({providedIn: 'root'})
export class AccountsListResolver implements Resolve<GetAccountsResponse> {

  constructor(private accountService: AccountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<GetAccountsResponse> | Promise<GetAccountsResponse> | GetAccountsResponse {
    return this.accountService.getAccounts('');
  }

}
