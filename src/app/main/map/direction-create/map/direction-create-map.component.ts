import {Component, EventEmitter, Output} from '@angular/core';
import {LatitudeLongitude, VehicleDetailsForList} from '../../../../model/api-model';
import {LocationService} from '../../../service/location.service';
import {VehicleService} from '../../../service/vehicle.service';
import {Location} from '@angular-material-extensions/google-maps-autocomplete';
import {MouseEvent} from '@agm/core';
import LatLngLiteral = google.maps.LatLngLiteral;
import DirectionsWaypoint = google.maps.DirectionsWaypoint;
import DirectionsResult = google.maps.DirectionsResult;
import Place = google.maps.Place;
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-direction-create-map',
  templateUrl: './direction-create-map.component.html',
  styleUrls: ['./direction-create-map.component.less']
})
export class DirectionCreateMapComponent {

  @Output()
  originCoordinatesEvent: EventEmitter<LatitudeLongitude> = new EventEmitter<LatitudeLongitude>();
  @Output()
  originAddressEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  destinationCoordinatesEvent: EventEmitter<LatitudeLongitude> = new EventEmitter<LatitudeLongitude>();
  @Output()
  destinationAddressEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  directionStepsEvent: EventEmitter<LatitudeLongitude[]> = new EventEmitter<LatitudeLongitude[]>();

  latitudeFromBrowser: number;
  longitudeFromBrowser: number;

  origin: LatLngLiteral;
  originSet = false;
  destination: LatLngLiteral;
  destinationSet = false;
  waypoints: DirectionsWaypoint[] = [];
  availableVehicles: VehicleDetailsForList[];

  direction: DirectionsResult;

  constructor(private locationService: LocationService,
              private vehicleService: VehicleService) {
    this.vehicleService.getVehicleAssignedToAccount().subscribe(result => {
      this.availableVehicles = result.vehicles;
    });
    locationService.getCurrentLocation().then(response => {
      this.latitudeFromBrowser = response.latitude;
      this.longitudeFromBrowser = response.longitude;
    });
    this.origin = {
      lng: 0,
      lat: 0,
    };
    this.destination = {
      lng: 0,
      lat: 0,
    };
  }

  emitOriginAddress(result: PlaceResult): void {
    this.originAddressEvent.emit(result.formatted_address);
  }

  emitDestinationAddress(result: PlaceResult): void {
    this.destinationAddressEvent.emit(result.formatted_address);
  }

  setOriginMarker(location: Location): void {
    this.origin.lat = location.latitude;
    this.origin.lng = location.longitude;
    this.originSet = true;
    this.originCoordinatesEvent.emit({ latitude: this.origin.lat, longitude: this.origin.lng });
  }

  setDestinationMarker(location: Location): void {
    this.destination.lat = location.latitude;
    this.destination.lng = location.longitude;
    this.destinationSet = true;
    this.destinationCoordinatesEvent.emit( { latitude: this.destination.lat, longitude: this.destination.lng });
  }

  saveDirection(result: DirectionsResult): void {
    this.direction = result;
  }

  addWaypoint(waypoint: MouseEvent): void {
    this.waypoints.push(this.convertLocationToWaypoint(waypoint.coords));
    this.waypoints = Array.from(this.waypoints);
  }

  deleteWaypoint(waypoint: DirectionsWaypoint): void {
    this.waypoints = this.waypoints.filter(w => w !== waypoint);
  }

  convertLocationToWaypoint(location: LatLngLiteral): DirectionsWaypoint {
    return { location: { location}, stopover: false };
  }

  extractWaypointsFromDirectionsResult(): LatitudeLongitude[] {
    const steps: LatitudeLongitude[] = [];
    const directionsSteps = this.direction.routes[0].legs[0].steps;
    directionsSteps.forEach(step => steps.push({ latitude: step.end_location.lat(), longitude: step.end_location.lng()}));
    steps.pop();
    if (steps.length > 25) {
      return this.reduceNumberOfWaypoints(steps);
    }
    return steps;
  }

  private reduceNumberOfWaypoints(waypoint: LatitudeLongitude[]): LatitudeLongitude[] {
    let max;
    let stepPositionToRemove;
    console.log('before reduce: ', waypoint);
    do {
      max = waypoint.length;
      stepPositionToRemove = Math.floor(Math.random() * (max - 1));
      waypoint.splice(stepPositionToRemove, 1);
    } while (waypoint.length > 25);

    console.log('after reduce: ', waypoint);
    return waypoint;
  }

  getLatitudeFromWaypoint(waypoint: DirectionsWaypoint): number {
    const latAndLng = ((waypoint.location as Place).location as LatLngLiteral);
    if (latAndLng !== undefined) {
      return latAndLng.lat;
    }
    return NaN;
  }

  getLongitudeFromWaypoint(waypoint: DirectionsWaypoint): number {
    const latAndLng = ((waypoint.location as Place).location as LatLngLiteral);
    if (latAndLng !== undefined) {
      return latAndLng.lng;
    }
    return NaN;
  }

}
