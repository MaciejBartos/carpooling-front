import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localePL from '@angular/common/locales/pl';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavBarComponent} from './layout/nav-bar/nav-bar.component';
import {ShareModule} from './share/share.module';
import {AccountPanelComponent} from './main/account/account-panel/account-panel.component';
import {AccountDetailsComponent} from './main/account/account-panel/account-details/account-details.component';
import {LoginComponent} from './main/authentication/login/login.component';
import {RegistrationComponent} from './main/authentication/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditAccountDetailsComponent} from './main/account/account-panel/edit-account-details/edit-account-details.component';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './main/interceptor/authentication.interceptor';
import {EditAccountPasswordComponent} from './main/account/account-panel/edit-account-password/edit-account-password.component';
import {AdminAccountListComponent} from './main/admin/admin-account-list/admin-account-list.component';
import {AccountListTableComponent} from './main/admin/admin-account-list/account-list-table/account-list-table.component';
import {AdminAccountDetailsComponent} from './main/admin/admin-account-details/admin-account-details.component';
import {AdminPanelComponent} from './main/admin/admin-panel/admin-panel.component';
import {ComponentNavBarComponent} from './layout/component-nav-bar/component-nav-bar.component';
import {AdminAccountEditPasswordComponent} from './main/admin/admin-account-details/admin-account-edit-password/admin-account-edit-password.component';
import {ConfirmAccountComponent} from './main/authentication/confirm-account/confirm-account.component';
import {ForgotPasswordComponent} from './main/account/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './main/account/reset-password/reset-password.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {VehicleEditDetailsComponent} from './main/vehicle/vehicle-edit-details/vehicle-edit-details.component';
import {VehiclePanelComponent} from './main/vehicle/vehicle-panel/vehicle-panel.component';
import {VehicleCreateComponent} from './main/vehicle/vehicle-create/vehicle-create.component';
import {VehicleListComponent} from './main/vehicle/vehicle-list/vehicle-list.component';
import { VehicleListTableComponent } from './main/vehicle/vehicle-list/vehicle-list-table/vehicle-list-table.component';
import {AgmDirectionModule} from 'agm-direction';
import {environment} from '../environments/environment';
import { DirectionCreateComponent } from './main/map/direction-create/direction-create.component';
import { MapPanelComponent } from './main/map/map-panel.component';
import { DirectionListComponent } from './main/map/direction-list/direction-list.component';
import { DirectionCreateMapComponent } from './main/map/direction-create/map/direction-create-map.component';
import { DirectionListTableComponent } from './main/map/direction-list/direction-list-table/direction-list-table.component';
import {registerLocaleData} from '@angular/common';
import { DirectionDetailsComponent } from './main/map/direction-details/direction-details.component';
import {MatSelectModule} from '@angular/material/select';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { DirectionsAssignedToUserComponent } from './main/map/directions-assigned-to-user/directions-assigned-to-user.component';
import { DirectionsCreatedByUserComponent } from './main/map/directions-created-by-user/directions-created-by-user.component';

registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AccountPanelComponent,
    AccountDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    EditAccountDetailsComponent,
    EditAccountPasswordComponent,
    AdminAccountListComponent,
    AccountListTableComponent,
    AdminAccountDetailsComponent,
    AdminPanelComponent,
    ComponentNavBarComponent,
    AdminAccountEditPasswordComponent,
    ConfirmAccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VehicleEditDetailsComponent,
    VehiclePanelComponent,
    VehicleCreateComponent,
    VehicleListComponent,
    VehicleListTableComponent,
    DirectionCreateComponent,
    MapPanelComponent,
    DirectionListComponent,
    DirectionCreateMapComponent,
    DirectionListTableComponent,
    DirectionDetailsComponent,
    DirectionsAssignedToUserComponent,
    DirectionsCreatedByUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatPaginatorModule,
    AgmDirectionModule,
    MatSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    { provide: LOCALE_ID, useValue: 'pl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
