import {Injectable} from '@angular/core';
import {VehicleDetailsToUpdateResponse} from '../../model/api-model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VehicleService} from '../service/vehicle.service';

@Injectable({providedIn: 'root'})
export class VehicleDetailsResolver implements Resolve<VehicleDetailsToUpdateResponse> {

  constructor(private vehicleService: VehicleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<VehicleDetailsToUpdateResponse> | Promise<VehicleDetailsToUpdateResponse> | VehicleDetailsToUpdateResponse {
    return this.vehicleService.getVehicleDetails(route.params.id);
  }

}
