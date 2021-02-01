import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {VehicleAssignedToAccountResponse} from '../../model/api-model';
import {VehicleService} from '../service/vehicle.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class VehicleListResolver implements Resolve<VehicleAssignedToAccountResponse> {

  constructor(private vehicleService: VehicleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<VehicleAssignedToAccountResponse> | Promise<VehicleAssignedToAccountResponse> | VehicleAssignedToAccountResponse {
    return this.vehicleService.getVehicleAssignedToAccount();
  }

}
