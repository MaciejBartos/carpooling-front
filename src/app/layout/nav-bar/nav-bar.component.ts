import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../main/service/token-storage.service';
import { Router } from '@angular/router';
import {NavLink, Role} from '../../model/api-model';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  navLinks: any[] = [];
  activeLinkIndex = -1;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {
    this.changeNavLinks();
  }

  ngOnInit(): void {
  }

  changeNavLinks(): void {
    if (this.tokenStorage.isLoggedIn()) {
      this.navLinks = [
        {
          label: 'Maps',
          link: '/map',
          index: 0,
          forRoles: [Role.ROLE_ADMIN]
        },
        {
          label: 'Profile',
          link: '/user',
          index: 1,
          forRoles: [Role.ROLE_USER, Role.ROLE_ADMIN]
        },
        {
          label: 'Admin panel',
          link: '/admin',
          index: 2,
          forRoles: [Role.ROLE_ADMIN]
        }
      ];
    } else {
      this.navLinks = [];
    }
  }

  getUserLogin(): string | null {
    return this.tokenStorage.getUserLogin();
  }

  isLoggedIn(): boolean {
    return this.tokenStorage.isLoggedIn();
  }

  isUserInRole(link: NavLink): boolean {
    return this.tokenStorage.hasRole(link.forRoles);
  }

  signOut(): void {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/');
  }

}
