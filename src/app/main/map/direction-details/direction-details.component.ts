import {Component} from '@angular/core';
import {DirectionService} from '../../service/direction.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AssignToDirectionRequest,
  GetDirectionDetailsResponse,
  LatitudeLongitude,
  ResignFromDirectionRequest
} from '../../../model/api-model';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import LatLngLiteral = google.maps.LatLngLiteral;
import DirectionsWaypoint = google.maps.DirectionsWaypoint;

@Component({
  selector: 'app-direction-details',
  templateUrl: './direction-details.component.html',
  styleUrls: ['./direction-details.component.less']
})
export class DirectionDetailsComponent {

  directionDetails: GetDirectionDetailsResponse;

  originForMap: LatLngLiteral;
  destinationForMap: LatLngLiteral;
  waypointsForMap: DirectionsWaypoint[] = [];

  pipe = new DatePipe('pl-PL');

  constructor(private directionService: DirectionService,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router) {
    this.directionDetails = activatedRoute.snapshot.data.direction;
    this.originForMap = this.convertToLatLngLiteralFormat(this.directionDetails.origin);
    this.destinationForMap = this.convertToLatLngLiteralFormat(this.directionDetails.destination);
    this.waypointsForMap = this.convertToDirectionsWaypoint(this.directionDetails.steps);
  }

  assign(): void {
    const request: AssignToDirectionRequest = {
      directionId: this.directionDetails.id
    };
    this.directionService.assign(request).subscribe(() => {
      this.toastrService.success('Successfully assigned to direction');
      this.fetchData();
    }, () => {
      this.toastrService.error('Something went wrong, try again');
      this.fetchData();
    });
  }

  resign(): void {
    const request: ResignFromDirectionRequest = {
      directionId: this.directionDetails.id
    };

    this.directionService.resign(request).subscribe(() => {
      this.toastrService.success('Successfully resigned from direction');
      this.fetchData();
    }, () => {
      this.toastrService.error('Something went wrong, try again');
      this.fetchData();
    });
  }

  showDate(date: Date): string | null {
    return this.pipe.transform(date, 'dd-MM-yyyy hh:mm');
  }

  private fetchData(): void {
    this.directionService.getDirectionDetails(this.directionDetails.id).subscribe(result => {
      this.directionDetails = result;
    }, () => {
      this.toastrService.error('Direction does not exist');
      this.router.navigateByUrl('/map/list');
    });
  }

  private convertToLatLngLiteralFormat(coordinates: LatitudeLongitude): LatLngLiteral {
    return { lat: coordinates.latitude, lng: coordinates.longitude };
  }

  private convertToDirectionsWaypoint(steps: LatitudeLongitude[]): DirectionsWaypoint[] {
    const waypoints: DirectionsWaypoint[] = [];
    steps.forEach(step => waypoints.push({ location: { location: { lat: step.latitude, lng: step.longitude } }, stopover: false }));
    return waypoints;
  }
}
