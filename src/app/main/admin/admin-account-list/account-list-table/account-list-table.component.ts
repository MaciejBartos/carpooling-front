import {Component, Input, OnInit} from '@angular/core';
import {AccountDetailsForList} from '../../../../model/api-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-list-table',
  templateUrl: './account-list-table.component.html',
  styleUrls: ['./account-list-table.component.less']
})
export class AccountListTableComponent implements OnInit {

  @Input()
  items: AccountDetailsForList[];
  displayedColumns: string[] = ['position', 'name', 'surname', 'login', 'email', 'status', 'action'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToDetails(id: string): void {
    this.router.navigateByUrl('/admin/account/details/' + id);
  }

}
