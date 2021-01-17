import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountPanelComponent} from './main/account/account-panel/account-panel.component';
import {LoginComponent} from './main/authentication/login/login.component';
import {RegistrationComponent} from './main/authentication/registration/registration.component';
import {EditAccountDetailsComponent} from './main/account/account-panel/edit-account-details/edit-account-details.component';
import {MapComponent} from './main/map/map.component';
import {AccountDetailsComponent} from './main/account/account-panel/account-details/account-details.component';
import {AccountDetailsResolver} from './main/resolver/account-details.resolver';
import {EditAccountPasswordComponent} from './main/account/account-panel/edit-account-password/edit-account-password.component';
import {AdminAccountListComponent} from './main/admin/admin-account-list/admin-account-list.component';
import {AccountsListResolver} from './main/resolver/accounts-list.resolver';
import {AdminAccountDetailsComponent} from './main/admin/admin-account-details/admin-account-details.component';
import {AdminPanelComponent} from './main/admin/admin-panel/admin-panel.component';
import {AccountDetailsAdminResolver} from './main/resolver/account-details-admin.resolver';
import {AdminAccountEditPasswordComponent} from './main/admin/admin-account-details/admin-account-edit-password/admin-account-edit-password.component';
import {ConfirmAccountComponent} from './main/authentication/confirm-account/confirm-account.component';

const routes: Routes = [
  {
    path: 'user',
    component: AccountPanelComponent,
    children : [
      {
        path: '',
        redirectTo: '/user/details',
        pathMatch: 'full'
      },
      {
        path: 'details',
        component: AccountDetailsComponent,
        resolve: {account: AccountDetailsResolver}
      },
      {
        path: 'edit/account',
        component: EditAccountDetailsComponent,
        resolve: {account: AccountDetailsResolver}
      },
      {
        path: 'edit/password',
        component: EditAccountPasswordComponent
      }
    ]},
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'account/list',
        pathMatch: 'full'
      },
      {
        path: 'account/list',
        component: AdminAccountListComponent,
        resolve: {accounts: AccountsListResolver},
      },
      {
        path: 'account/details/:id',
        component: AdminAccountDetailsComponent,
        resolve: {account: AccountDetailsAdminResolver}
      },
      {
        path: 'account/details/:id/password',
        component: AdminAccountEditPasswordComponent,
        resolve: {account: AccountDetailsAdminResolver}
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'register/confirm',
    component: ConfirmAccountComponent
  },
  {
    path: 'map',
    component: MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
