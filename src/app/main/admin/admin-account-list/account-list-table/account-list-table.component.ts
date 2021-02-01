import {Component, Input} from '@angular/core';
import {AccountDetailsForList} from '../../../../model/api-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-list-table',
  templateUrl: './account-list-table.component.html',
  styleUrls: ['./account-list-table.component.less']
})
export class AccountListTableComponent {

  @Input()
  items: AccountDetailsForList[];
  displayedColumns: string[] = ['login', 'email', 'name', 'surname', 'status', 'action'];

  constructor(private router: Router) { }

  redirectToDetails(id: string): void {
    this.router.navigateByUrl('/admin/account/details/' + id);
  }

}
