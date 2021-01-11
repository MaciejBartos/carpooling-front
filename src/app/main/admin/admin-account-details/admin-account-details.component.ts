import { Component, OnInit } from '@angular/core';
import {AccountDetails} from '../../../model/api-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-account-details',
  templateUrl: './admin-account-details.component.html',
  styleUrls: ['./admin-account-details.component.less']
})
export class AdminAccountDetailsComponent implements OnInit {

  accountDetails: AccountDetails;

  constructor(private activatedRoute: ActivatedRoute) {
    this.accountDetails = this.activatedRoute.snapshot.data.account;
  }

  ngOnInit(): void {
  }

}
