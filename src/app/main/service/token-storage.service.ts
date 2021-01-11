import {Injectable} from '@angular/core';
import {windowWhen} from 'rxjs/operators';
import {Role} from '../../model/api-model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLES_KEY = 'auth-roles';
const ACCOUNT_KEY = 'auth-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    return token !== null;
  }

  public hasRole(role: Role[]): boolean {
    const roles = this.getRoles();
    return role.some(r => roles.includes(r));
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUserLogin(login: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, login);
  }

  public getUserLogin(): string {
    const userLogin = window.sessionStorage.getItem(USER_KEY);
    return userLogin !== null ? userLogin : '';
  }

  public saveRoles(roles: any): void {
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.setItem(ROLES_KEY, roles);
  }

  public getRoles(): string {
    const roles = window.sessionStorage.getItem(ROLES_KEY);
    return roles !== null ? roles : '';
  }

  public saveAccountId(id: string): void {
    window.sessionStorage.removeItem(ACCOUNT_KEY);
    window.sessionStorage.setItem(ACCOUNT_KEY, id);
  }

  public getAccountId(): string {
    const accountId = window.sessionStorage.getItem(ACCOUNT_KEY);
    return accountId !== null ? accountId : '';
  }
}
