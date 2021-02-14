import {Component} from '@angular/core';
import {AccountDetails, UpdateUserRolesRequest} from '../../../model/api-model';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {FormControl} from '@angular/forms';
import {RoleService} from '../../service/role.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-account-details',
  templateUrl: './admin-account-details.component.html',
  styleUrls: ['./admin-account-details.component.less']
})
export class AdminAccountDetailsComponent {

  accountDetails: AccountDetails;
  rolesForm: FormControl;
  rolesAvailable: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private router: Router,
              private roleService: RoleService,
              private toastrService: ToastrService) {
    this.accountDetails = this.activatedRoute.snapshot.data.account;
    this.roleService.getAllAvailableRolesInSystem().subscribe(result => {
      this.rolesAvailable = result.roles;
    });
    this.rolesForm = new FormControl(this.accountDetails.roles);
  }

  fetchData(): void {
    this.accountService.getAccountDetailsById(this.accountDetails.account.id).subscribe(account => this.accountDetails = account);
  }

  changeRoles(): void {
    if (this.rolesForm.value === this.accountDetails.roles) {
      return;
    }

    const request: UpdateUserRolesRequest = {
      accountId: this.accountDetails.account.id,
      roles: this.rolesForm.value
    };

    this.roleService.updateUserRoles(request).subscribe(() => {
      this.toastrService.success('Successfully changed roles');
      this.fetchData();
    }, () => {
      this.toastrService.error('Something went wrong, please try again');
      this.fetchData();
    });
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
