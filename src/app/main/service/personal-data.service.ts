import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PersonalData} from '../../model/api-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  apiUrl: string = environment.apiUrl;
  resource = '/personal-data';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public updatePersonalData(personalData: PersonalData): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource, personalData, this.httpOptions);
  }
}
