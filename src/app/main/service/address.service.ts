import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Address} from '../../model/api-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl: string = environment.apiUrl;
  resource = '/address';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public updateAddress(address: Address): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource, address, this.httpOptions);
  }
}
