import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountPanelComponent} from './main/account/account-panel/account-panel.component';
import {LoginComponent} from './main/authentication/login/login.component';
import {RegistrationComponent} from './main/authentication/registration/registration.component';
import {EditAccountDetailsComponent} from './main/account/account-panel/edit-account-details/edit-account-details.component';
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
import {ForgotPasswordComponent} from './main/account/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './main/account/reset-password/reset-password.component';
import {VehicleEditDetailsComponent} from './main/vehicle/vehicle-edit-details/vehicle-edit-details.component';
import {VehicleDetailsResolver} from './main/resolver/vehicle-details.resolver';
import {VehiclePanelComponent} from './main/vehicle/vehicle-panel/vehicle-panel.component';
import {VehicleCreateComponent} from './main/vehicle/vehicle-create/vehicle-create.component';
import {VehicleListComponent} from './main/vehicle/vehicle-list/vehicle-list.component';
import {VehicleListResolver} from './main/resolver/vehicle-list.resolver';
import {MapPanelComponent} from './main/map/map-panel.component';
import {DirectionCreateComponent} from './main/map/direction-create/direction-create.component';
import {DirectionListComponent} from './main/map/direction-list/direction-list.component';
import {DirectionDetailsComponent} from './main/map/direction-details/direction-details.component';
import {DirectionDetailsResolver} from './main/resolver/direction-details.resolver';
import {DirectionsCreatedByUserComponent} from './main/map/directions-created-by-user/directions-created-by-user.component';
import {DirectionsAssignedToUserComponent} from './main/map/directions-assigned-to-user/directions-assigned-to-user.component';
import {DirectionsAssignedToUserResolver} from './main/resolver/directions-assigned-to-user.resolver';
import {DirectionsCreatedByUserResolver} from './main/resolver/directions-created-by-user.resolver';

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
      },
      {
        path: 'directions/created',
        component: DirectionsCreatedByUserComponent,
        resolve: {directions: DirectionsCreatedByUserResolver}
      },
      {
        path: 'directions/assigned',
        component: DirectionsAssignedToUserComponent,
        resolve: {directions: DirectionsAssignedToUserResolver}
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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
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
    component: MapPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: DirectionCreateComponent
      },
      {
        path: 'list',
        component: DirectionListComponent
      },
      {
        path: ':id',
        component: DirectionDetailsComponent,
        resolve: {direction: DirectionDetailsResolver}
      }
    ]
  },
  {
    path: 'vehicle',
    component: VehiclePanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: VehicleCreateComponent
      },
      {
        path: 'list',
        component: VehicleListComponent,
        resolve: {vehicles: VehicleListResolver}
      },
      {
        path: ':id',
        component: VehicleEditDetailsComponent,
        resolve: {vehicle: VehicleDetailsResolver}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
