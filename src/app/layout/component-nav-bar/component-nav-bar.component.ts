import {Component, Input, OnInit} from '@angular/core';
import {NavLink} from '../../model/api-model';
import {TokenStorageService} from '../../main/service/token-storage.service';

@Component({
  selector: 'app-component-nav-bar',
  templateUrl: './component-nav-bar.component.html',
  styleUrls: ['./component-nav-bar.component.less']
})
export class ComponentNavBarComponent implements OnInit {

  @Input()
  navLinks: NavLink[] = [];

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }


  isUserInRole(link: NavLink): boolean {
    return this.tokenStorage.hasRole(link.forRoles);
  }
}
