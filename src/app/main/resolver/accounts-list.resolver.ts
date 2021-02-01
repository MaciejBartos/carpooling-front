import {Injectable} from '@angular/core';
import {GetAccountsResponse, GetAccountsSearchCriteriaRequest} from '../../model/api-model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '../service/account.service';

@Injectable({providedIn: 'root'})
export class AccountsListResolver implements Resolve<GetAccountsResponse> {

  constructor(private accountService: AccountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<GetAccountsResponse> | Promise<GetAccountsResponse> | GetAccountsResponse {
    const request: GetAccountsSearchCriteriaRequest = {
      searchCriteria: '',
    };
    return this.accountService.getAccounts(request);
  }

}
