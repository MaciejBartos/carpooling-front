import {Component} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {NavLink, Role} from '../../../../model/api-model';

@Component({
  selector: 'app-account-nav-bar',
  templateUrl: './account-nav-bar.component.html',
  styleUrls: ['./account-nav-bar.component.less']
})
export class AccountNavBarComponent {

  navLinks: NavLink[] = [];

  constructor(private tokenStorage: TokenStorageService) {
    this.navLinks = [
      {
        label: 'Details',
        link: '/user/details',
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Edit data',
        link: '/user/edit/account',
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Edit password',
        link: '/user/edit/password',
        forRoles: [Role.ROLE_USER]
      }
    ];
  }

  isUserInRole(link: NavLink): boolean {
    return this.tokenStorage.hasRole(link.forRoles);
  }
}
