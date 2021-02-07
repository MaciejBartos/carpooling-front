import { Component } from '@angular/core';
import {NavLink, Role} from '../../model/api-model';

@Component({
  selector: 'app-map-navbar',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.less']
})
export class MapPanelComponent {

  navLinks: NavLink[] = [];

  constructor() {
    this.navLinks = [
      {
        label: 'Create direction',
        link: '/map/create/',
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Find direction',
        link: '/map/list/',
        forRoles: [Role.ROLE_USER]
      }
    ];
  }

}
