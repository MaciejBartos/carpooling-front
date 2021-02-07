import {Component} from '@angular/core';
import {DirectionService} from '../../service/direction.service';
import {ActivatedRoute} from '@angular/router';
import {GetDirectionDetailsResponse, LatitudeLongitude} from '../../../model/api-model';
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

  constructor(private directionService: DirectionService,
              private activatedRoute: ActivatedRoute) {
    this.directionDetails = activatedRoute.snapshot.data.direction;
    console.log(this.directionDetails);
    this.originForMap = this.convertToLatLngLiteralFormat(this.directionDetails.origin);
    this.destinationForMap = this.convertToLatLngLiteralFormat(this.directionDetails.destination);
    this.waypointsForMap = this.convertToDirectionsWaypoint(this.directionDetails.steps);
  }

  convertToLatLngLiteralFormat(coordinates: LatitudeLongitude): LatLngLiteral {
    return { lat: coordinates.latitude, lng: coordinates.longitude };
  }

  convertToDirectionsWaypoint(steps: LatitudeLongitude[]): DirectionsWaypoint[] {
    const waypoints: DirectionsWaypoint[] = [];
    steps.forEach(step => waypoints.push({ location: { location: { lat: step.latitude, lng: step.longitude } }, stopover: false }));
    return waypoints;
  }
}
