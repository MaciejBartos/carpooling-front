import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {NavLink, Role} from '../../../../model/api-model';

@Component({
  selector: 'app-account-nav-bar',
  templateUrl: './account-nav-bar.component.html',
  styleUrls: ['./account-nav-bar.component.less']
})
export class AccountNavBarComponent implements OnInit {

  navLinks: NavLink[] = [];

  constructor(private tokenStorage: TokenStorageService) {
    this.navLinks = [
      {
        label: 'Details',
        link: '/user/details',
        index: 0,
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Edit data',
        link: '/user/edit/account',
        index: 1,
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Edit password',
        link: '/user/edit/password',
        index: 3,
        forRoles: [Role.ROLE_USER]
      }
    ];
  }

  ngOnInit(): void {
  }

  isUserInRole(link: NavLink): boolean {
    return this.tokenStorage.hasRole(link.forRoles);
  }
}
