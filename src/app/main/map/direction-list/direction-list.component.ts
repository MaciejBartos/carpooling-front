import {Component} from '@angular/core';
import {DirectionDetailsForList, GetDirectionForGivenCoordinatesRequest, LatitudeLongitude} from '../../../model/api-model';
import {Location} from '@angular-material-extensions/google-maps-autocomplete';
import {DirectionService} from '../../service/direction.service';
import {FormControl, Validators} from '@angular/forms';
import {isDateLaterOrSame} from '../../../share/validator/date-later-or-same';

@Component({
  selector: 'app-map-list',
  templateUrl: './direction-list.component.html',
  styleUrls: ['./direction-list.component.less']
})
export class DirectionListComponent {

  renderFieldInTable: string[] = ['originAddress', 'destinationAddress', 'driverInfo', 'travelDate', 'detailsAction'];

  directions: DirectionDetailsForList[] = [];
  travelDate: FormControl;
  origin: LatitudeLongitude;
  destination: LatitudeLongitude;
  distance: FormControl;
  originSet = false;
  destinationSet = false;
  searched = false;

  constructor(private directionsService: DirectionService) {
    this.origin = {
      longitude: 0,
      latitude: 0,
    };
    this.destination = {
      longitude: 0,
      latitude: 0,
    };
    this.distance = new FormControl(5, [
      Validators.required,
      Validators.pattern(new RegExp('^[1-9][0-9]*$'))
    ]);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    this.travelDate = new FormControl(null, [
      Validators.required,
      isDateLaterOrSame(todayDate)
    ]);
  }

  setOriginMarker(location: Location): void {
    this.origin.latitude = location.latitude;
    this.origin.longitude = location.longitude;
    this.originSet = true;
  }

  setDestinationMarker(location: Location): void {
    this.destination.latitude = location.latitude;
    this.destination.longitude = location.longitude;
    this.destinationSet = true;
  }

  private getDateWithCorrectTimeOffset(): Date {
    this.travelDate.value.setHours(this.travelDate.value.getHours() + 1);
    return this.travelDate.value;
  }

  getDirectionsList(): void {
    if (!(this.destinationSet && this.originSet && this.distance.valid && this.travelDate.valid)) {
      return;
    }
    const request: GetDirectionForGivenCoordinatesRequest = {
      origin: this.origin,
      destination: this.destination,
      distance: this.distance.value,
      travelDate: this.getDateWithCorrectTimeOffset()
    };
    this.directionsService.getDirectionsForGivenCoordinates(request).subscribe(result => {
      this.directions = result.directions;
      this.searched = true;
    });
  }

}
