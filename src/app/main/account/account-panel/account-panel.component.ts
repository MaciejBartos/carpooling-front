import {Component} from '@angular/core';
import {NavLink, Role} from '../../../model/api-model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.less']
})
export class AccountPanelComponent {

  navLinks: NavLink[] = [];

  constructor() {
    this.navLinks = [
      {
        label: 'Edit data',
        link: '/user/edit/account',
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Edit password',
        link: '/user/edit/password',
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'My directions',
        link: '/user/directions/created',
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Directions assigned to',
        link: '/user/directions/assigned',
        forRoles: [Role.ROLE_USER]
      }
    ];
  }

}
