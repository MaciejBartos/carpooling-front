import {Component, ElementRef, ViewChild} from '@angular/core';
import {VehicleService} from '../../service/vehicle.service';
import {DirectionCreateMapComponent} from './map/direction-create-map.component';
import {DirectionService} from '../../service/direction.service';
import {CreateDirectionRequest, LatitudeLongitude, VehicleDetailsForList} from '../../../model/api-model';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-map',
  templateUrl: './direction-create.component.html',
  styleUrls: ['./direction-create.component.less']
})
export class DirectionCreateComponent {

  @ViewChild('map')
  mapComponent: DirectionCreateMapComponent;
  availableVehicles: VehicleDetailsForList[];

  originCoordinates: LatitudeLongitude;
  originAddress: string;
  destinationCoordinates: LatitudeLongitude;
  destinationAddress: string;
  travelDateForm: FormControl;
  numberOfFreeSeatsForm: FormControl;

  constructor(private vehicleService: VehicleService,
              private directionService: DirectionService) {
    this.vehicleService.getVehicleAssignedToAccount().subscribe(result => {
      this.availableVehicles = result.vehicles;
    });
    this.initFormControls();
  }

  saveDirection(): void {
    const directionSteps: LatitudeLongitude[] = this.mapComponent.extractWaypointsFromDirectionsResult();
    const request: CreateDirectionRequest = {
      vehicleId: this.availableVehicles[0].id,
      origin: this.originCoordinates,
      originAddress: this.originAddress,
      destination: this.destinationCoordinates,
      destinationAddress: this.destinationAddress,
      waypoints: directionSteps,
      travelDate: this.travelDateForm.value,
      numberOfFreeSeats: this.numberOfFreeSeatsForm.value
    };
    this.directionService.createDirection(request).subscribe();
  }

  private initFormControls(): void {
    this.travelDateForm = new FormControl(new Date(), [
      Validators.required
    ]);
    this.numberOfFreeSeatsForm = new FormControl(2, [
      Validators.required
    ]);
  }

}
