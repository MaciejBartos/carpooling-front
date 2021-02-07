import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {GetDirectionDetailsResponse} from '../../model/api-model';
import {DirectionService} from '../service/direction.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DirectionDetailsResolver implements Resolve<GetDirectionDetailsResponse> {

  constructor(private directionService: DirectionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<GetDirectionDetailsResponse> | Promise<GetDirectionDetailsResponse> | GetDirectionDetailsResponse {
    return this.directionService.getDirectionDetails(route.params.id);
  }
}
