import {Component, Input, OnInit} from '@angular/core';
import {AccountDetailsForList} from '../../../../model/api-model';

@Component({
  selector: 'app-account-list-table',
  templateUrl: './account-list-table.component.html',
  styleUrls: ['./account-list-table.component.less']
})
export class AccountListTableComponent implements OnInit {

  @Input()
  items: AccountDetailsForList[];
  displayedColumns: string[] = ['position', 'name', 'surname', 'login', 'email', 'status'];

  constructor() { }

  ngOnInit(): void {
  }

}
