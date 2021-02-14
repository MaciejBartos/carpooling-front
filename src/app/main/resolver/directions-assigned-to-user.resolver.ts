import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {GetDirectionsResponse} from '../../model/api-model';
import {DirectionService} from '../service/direction.service';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class DirectionsAssignedToUserResolver implements Resolve<GetDirectionsResponse> {

  constructor(private directionService: DirectionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<GetDirectionsResponse> | Promise<GetDirectionsResponse> | GetDirectionsResponse {
    return this.directionService.getDirectionsAssignedToCurrentUser();
  }
}
