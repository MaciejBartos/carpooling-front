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

  navLinks: NavLink[] = [];

  constructor(private tokenStorage: TokenStorageService,
              private router: Router) {
    this.changeNavLinks();
  }

  ngOnInit(): void {
  }

  changeNavLinks(): void {
      this.navLinks = [
        {
          label: 'Maps',
          link: '/map',
          forRoles: [Role.ROLE_USER, Role.ROLE_ADMIN]
        },
        {
          label: 'Profile',
          link: '/user',
          forRoles: [Role.ROLE_USER, Role.ROLE_ADMIN]
        },
        {
          label: 'Admin panel',
          link: '/admin',
          forRoles: [Role.ROLE_ADMIN]
        },
        {
          label: 'Vehicle',
          link: '/vehicle',
          forRoles: [Role.ROLE_USER]
        }
      ];
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
