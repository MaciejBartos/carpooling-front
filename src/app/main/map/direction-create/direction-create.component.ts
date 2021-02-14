import {Component, ViewChild} from '@angular/core';
import {VehicleService} from '../../service/vehicle.service';
import {DirectionCreateMapComponent} from './map/direction-create-map.component';
import {DirectionService} from '../../service/direction.service';
import {CreateDirectionRequest, LatitudeLongitude, VehicleDetailsForList} from '../../../model/api-model';
import {FormControl, Validators} from '@angular/forms';
import {isDateLaterThan} from '../../../share/validator/date-later-than';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-map',
  templateUrl: './direction-create.component.html',
  styleUrls: ['./direction-create.component.less']
})
export class DirectionCreateComponent {

  @ViewChild('map')
  mapComponent: DirectionCreateMapComponent;
  availableVehicles: VehicleDetailsForList[];
  vehicleFound = false;
  selectedVehicle: FormControl;

  originCoordinates: LatitudeLongitude;
  originAddress = '';
  destinationCoordinates: LatitudeLongitude;
  destinationAddress = '';
  travelDateForm: FormControl;
  numberOfFreeSeatsForm: FormControl;

  constructor(private vehicleService: VehicleService,
              private directionService: DirectionService,
              private toastrService: ToastrService,
              private router: Router) {
    this.vehicleService.getVehicleAssignedToAccount().subscribe(result => {
      this.availableVehicles = result.vehicles;
      this.vehicleFound = true;
    });
    this.numberOfFreeSeatsForm = new FormControl(null);
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
    this.directionService.createDirection(request).subscribe(result => {
      this.toastrService.success('Successfully created direction');
      this.router.navigateByUrl('/map/' + result.directionId);
    }, () => {
      this.toastrService.error('Something went wrong, please try again');
    });
  }

  onSelectedVehicleChange(): void {
    this.initNumberOfFreeSeatsFormAccordingToSelectedVehicle();
  }

  validateForms(): boolean {
    return this.originAddress !== '' && this.destinationAddress !== '' &&
      this.travelDateForm.valid && this.selectedVehicle.valid &&
      this.numberOfFreeSeatsForm.valid;
  }

  private initFormControls(): void {
    this.selectedVehicle = new FormControl(null, [
      Validators.required
    ]);
    this.travelDateForm = new FormControl(null, [
      Validators.required,
      isDateLaterThan(new Date())
    ]);
  }

  private initNumberOfFreeSeatsFormAccordingToSelectedVehicle(): void {
    this.numberOfFreeSeatsForm = new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(this.selectedVehicle.value.numberOfSeats - 1)
    ]);
  }

}
