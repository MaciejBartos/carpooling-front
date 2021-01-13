import { Component, OnInit } from '@angular/core';
import {NavLink, Role} from '../../../model/api-model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.less']
})
export class AdminPanelComponent implements OnInit {

  navLinks: NavLink[] = [];

  constructor() {
    this.navLinks = [
      {
        label: 'Accounts list',
        link: '/admin/account/list',
        index: 0,
        forRoles: [Role.ROLE_ADMIN]
      }
    ];
  }

  ngOnInit(): void {
  }

}
