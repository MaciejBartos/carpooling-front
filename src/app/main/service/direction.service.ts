import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CreateDirectionRequest, GetDirectionDetailsResponse, GetDirectionsResponse} from '../../model/api-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  apiUrl: string = environment.apiUrl;
  resource = '/direction';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public createDirection(request: CreateDirectionRequest): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl + this.resource, request, this.httpOptions);
  }

  public getDirections(): Observable<GetDirectionsResponse> {
    return this.httpClient.get<GetDirectionsResponse>(this.apiUrl + this.resource, this.httpOptions);
  }

  public getDirectionDetails(id: string): Observable<GetDirectionDetailsResponse> {
    return this.httpClient.get<GetDirectionDetailsResponse>(this.apiUrl + this.resource + '/' + id, this.httpOptions);
  }
}
