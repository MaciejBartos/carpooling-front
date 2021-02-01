import {Component} from '@angular/core';
import {AccountDetails} from '../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-admin-account-details',
  templateUrl: './admin-account-details.component.html',
  styleUrls: ['./admin-account-details.component.less']
})
export class AdminAccountDetailsComponent {

  accountDetails: AccountDetails;

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private router: Router) {
    this.accountDetails = this.activatedRoute.snapshot.data.account;
  }

  fetchData(): void {
    this.accountService.getAccountDetailsById(this.accountDetails.account.id).subscribe(account => this.accountDetails = account);
  }

  changeAccountStatus(): void {
    const request = {
      id: this.accountDetails.account.id,
      version: this.accountDetails.account.version
    };
    this.accountService.changeAccountStatus(request).subscribe(() => {
      this.fetchData();
    });
  }

  redirectToPasswordChange(): void {
    this.router.navigate(['admin/account/details/' + this.accountDetails.account.id + '/password']);
  }

}
