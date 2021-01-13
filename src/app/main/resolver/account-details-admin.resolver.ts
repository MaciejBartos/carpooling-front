import { Injectable } from '@angular/core';
import { AccountDetails } from '../../model/api-model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable({providedIn: 'root'})
export class AccountDetailsAdminResolver implements Resolve<AccountDetails> {

  constructor(private accountService: AccountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<AccountDetails> | Promise<AccountDetails> | AccountDetails {
    return this.accountService.getAccountDetailsById(route.params.id);
  }

}
