import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  AssignToDirectionRequest,
  CreateDirectionRequest, CreateDirectionResponse,
  GetDirectionDetailsResponse,
  GetDirectionForGivenCoordinatesRequest,
  GetDirectionsResponse, ResignFromDirectionRequest
} from '../../model/api-model';
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

  public assign(request: AssignToDirectionRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/assign', request, this.httpOptions);
  }

  public resign(request: ResignFromDirectionRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource + '/resign', request, this.httpOptions);
  }

  public createDirection(request: CreateDirectionRequest): Observable<CreateDirectionResponse> {
    return this.httpClient.post<CreateDirectionResponse>(this.apiUrl + this.resource, request, this.httpOptions);
  }

  public deleteDirection(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + this.resource + '/' + id, this.httpOptions);
  }

  public getDirectionsAssignedToCurrentUser(): Observable<GetDirectionsResponse> {
    return this.httpClient.get<GetDirectionsResponse>(this.apiUrl + this.resource + '/assign', this.httpOptions);
  }

  public getDirectionsCreatedByCurrentUser(): Observable<GetDirectionsResponse> {
    return this.httpClient.get<GetDirectionsResponse>(this.apiUrl + this.resource + '/created', this.httpOptions);
  }

  public getDirectionsForGivenCoordinates(request: GetDirectionForGivenCoordinatesRequest): Observable<GetDirectionsResponse> {
    return this.httpClient.post<GetDirectionsResponse>(this.apiUrl + this.resource + '/filter', request, this.httpOptions);
  }

  public getDirectionDetails(id: string): Observable<GetDirectionDetailsResponse> {
    return this.httpClient.get<GetDirectionDetailsResponse>(this.apiUrl + this.resource + '/' + id, this.httpOptions);
  }
}
