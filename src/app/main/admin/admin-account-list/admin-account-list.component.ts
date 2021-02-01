import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountDetailsForList, GetAccountsSearchCriteriaRequest} from '../../../model/api-model';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-admin-account-list',
  templateUrl: './admin-account-list.component.html',
  styleUrls: ['./admin-account-list.component.less']
})
export class AdminAccountListComponent {

  accounts: AccountDetailsForList[];
  searchCriteria;
  page: number;
  pageSize: number;

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService) {
    this.accounts = this.activatedRoute.snapshot.data.accounts.accounts;
    this.searchCriteria = '';
    this.page = 0;
    this.pageSize = 10;
  }

  getAccountsWithSearchCriteria(): void {
    const request: GetAccountsSearchCriteriaRequest = {
      searchCriteria: this.searchCriteria,
    };
    this.accountService.getAccounts(request).subscribe(data => {
      this.accounts = data.accounts;
    });
  }

}
