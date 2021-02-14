import { Injectable } from '@angular/core';
import {AvailableRolesResponse, UpdateUserRolesRequest} from '../../model/api-model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl: string = environment.apiUrl;
  resource = '/role';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public updateUserRoles(request: UpdateUserRolesRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/account', request, this.httpOptions);
  }

  public getAllAvailableRolesInSystem(): Observable<AvailableRolesResponse> {
    return this.httpClient.get<AvailableRolesResponse>(this.apiUrl + this.resource, this.httpOptions);
  }
}
