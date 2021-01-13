import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import {MapComponent} from './main/map/map.component';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './main/interceptor/authentication.interceptor';
import { AccountNavBarComponent } from './main/account/account-panel/account-nav-bar/account-nav-bar.component';
import { EditAccountPasswordComponent } from './main/account/account-panel/edit-account-password/edit-account-password.component';
import { AdminAccountListComponent } from './main/admin/admin-account-list/admin-account-list.component';
import { AccountListTableComponent } from './main/admin/admin-account-list/account-list-table/account-list-table.component';
import { AdminAccountDetailsComponent } from './main/admin/admin-account-details/admin-account-details.component';
import { AdminPanelComponent } from './main/admin/admin-panel/admin-panel.component';
import { ComponentNavBarComponent } from './layout/component-nav-bar/component-nav-bar.component';
import { AdminAccountEditPasswordComponent } from './main/admin/admin-account-details/admin-account-edit-password/admin-account-edit-password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AccountPanelComponent,
    AccountDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    EditAccountDetailsComponent,
    MapComponent,
    AccountNavBarComponent,
    EditAccountPasswordComponent,
    AdminAccountListComponent,
    AccountListTableComponent,
    AdminAccountDetailsComponent,
    AdminPanelComponent,
    ComponentNavBarComponent,
    AdminAccountEditPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZZwBxKiXwKXCmDpNjd6tIzzBwKj_3tEU',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
