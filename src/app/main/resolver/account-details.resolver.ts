import {Injectable} from '@angular/core';
import {AccountDetails} from '../../model/api-model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';

@Injectable({providedIn: 'root'})
export class AccountDetailsResolver implements Resolve<AccountDetails> {

  constructor(private accountService: AccountService,
              private storage: TokenStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<AccountDetails> | Promise<AccountDetails> | AccountDetails {
    return this.accountService.getAccountDetailsByLogin(this.storage.getUserLogin());
  }

}
