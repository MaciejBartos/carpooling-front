import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {AccountDetails} from '../../../../model/api-model';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.less']
})
export class AccountDetailsComponent implements OnInit {

  accountDetails: AccountDetails;

  constructor(private accountService: AccountService,
              private tokenStorageService: TokenStorageService,
              private activatedRoute: ActivatedRoute) {
      this.accountDetails = this.activatedRoute.snapshot.data.account;
  }

  ngOnInit(): void {
  }

}
