import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  CreateVehicleRequest,
  UpdateVehicleRequest,
  VehicleAssignedToAccountResponse,
  VehicleDetailsToUpdateResponse
} from '../../model/api-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  apiUrl: string = environment.apiUrl;
  resource = '/vehicle';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public createVehicle(request: CreateVehicleRequest): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl + this.resource, request, this.httpOptions);
  }

  public getVehicleAssignedToAccount(): Observable<VehicleAssignedToAccountResponse> {
    return this.httpClient.get<VehicleAssignedToAccountResponse>(this.apiUrl + this.resource, this.httpOptions);
  }

  public getVehicleDetails(id: string): Observable<VehicleDetailsToUpdateResponse> {
    return this.httpClient.get<VehicleDetailsToUpdateResponse>(this.apiUrl + this.resource + '/' + id, this.httpOptions);
  }

  public updateVehicle(request: UpdateVehicleRequest): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl + this.resource, request, this.httpOptions);
  }

  public deleteVehicle(id: string): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + this.resource + '/' + id, this.httpOptions);
  }
}
