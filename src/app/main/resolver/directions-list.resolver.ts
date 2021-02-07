import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {GetDirectionsResponse} from '../../model/api-model';
import {Observable} from 'rxjs';
import {DirectionService} from '../service/direction.service';

@Injectable({providedIn: 'root'})
export class DirectionsListResolver implements Resolve<GetDirectionsResponse> {

  constructor(private directionService: DirectionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<GetDirectionsResponse> | Promise<GetDirectionsResponse> | GetDirectionsResponse {
    return this.directionService.getDirections();
  }
}
