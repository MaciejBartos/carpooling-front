import {Component} from '@angular/core';
import {NavLink, Role} from '../../../model/api-model';

@Component({
  selector: 'app-vehicle-panel',
  templateUrl: './vehicle-panel.component.html',
  styleUrls: ['./vehicle-panel.component.less']
})
export class VehiclePanelComponent {

  navLinks: NavLink[] = [];

  constructor() {
    this.navLinks = [
      {
        label: 'List',
        link: '/vehicle/list',
        forRoles: [Role.ROLE_USER]
      },
      {
        label: 'Create vehicle',
        link: '/vehicle/create',
        forRoles: [Role.ROLE_USER]
      },
    ];
  }

}
