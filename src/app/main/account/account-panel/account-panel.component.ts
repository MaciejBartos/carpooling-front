import { Component, OnInit } from '@angular/core';
import {NavLink, Role} from '../../../model/api-model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.less']
})
export class AccountPanelComponent implements OnInit {

  navLinks: NavLink[] = [];

  constructor() {
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

}
