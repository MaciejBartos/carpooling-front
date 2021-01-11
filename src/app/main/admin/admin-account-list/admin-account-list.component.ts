import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountDetailsForList} from '../../../model/api-model';

@Component({
  selector: 'app-admin-account-list',
  templateUrl: './admin-account-list.component.html',
  styleUrls: ['./admin-account-list.component.less']
})
export class AdminAccountListComponent implements OnInit {

  accounts: AccountDetailsForList[];

  constructor(private activatedRoute: ActivatedRoute) {
    this.accounts = this.activatedRoute.snapshot.data.accounts.accounts;
  }

  ngOnInit(): void {
  }

}
