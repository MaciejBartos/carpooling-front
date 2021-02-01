import {Component} from '@angular/core';
import {UpdateVehicleRequest, VehicleDetailsToUpdateResponse} from '../../../model/api-model';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {VehicleService} from '../../service/vehicle.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-edit-details',
  templateUrl: './vehicle-edit-details.component.html',
  styleUrls: ['./vehicle-edit-details.component.less']
})
export class VehicleEditDetailsComponent {

  vehicleDetails: VehicleDetailsToUpdateResponse;
  brandFormControl: FormControl;
  modelFormControl: FormControl;
  productionYearFormControl: FormControl;
  descriptionFormControl: FormControl;
  numberOfSeatsFormControl: FormControl;

  constructor(private activatedRoute: ActivatedRoute,
              private vehicleService: VehicleService,
              private toastrService: ToastrService) {
    this.vehicleDetails = this.activatedRoute.snapshot.data.vehicle;
    this.initVehicleDetailsFormControls();
  }

  fetchData(): void {
    this.vehicleService.getVehicleDetails(this.vehicleDetails.id).subscribe(response => {
      this.vehicleDetails = response;
    });
  }

  save(): void {
    if (!this.checkIfFieldsAreValid()) {
      return;
    }
    if (!this.checkIfValuesAreDifferentFromStarted()) {
      return;
    }

    const request: UpdateVehicleRequest = {
      id: this.vehicleDetails.id,
      brand: this.brandFormControl.value,
      model: this.modelFormControl.value,
      productionYear: this.productionYearFormControl.value,
      description: this.descriptionFormControl.value,
      numberOfSeats: this.numberOfSeatsFormControl.value,
      version: this.vehicleDetails.version
    };

    this.vehicleService.updateVehicle(request).subscribe(() => {
      this.toastrService.success('Successfully changed information about vehicle');
      this.fetchData();
    }, () => {
      this.toastrService.error('Something went wrong, please try again');
      this.fetchData();
    });
  }

  checkIfValuesAreDifferentFromStarted(): boolean {
    return this.brandFormControl.value !== this.vehicleDetails.brand || this.modelFormControl.value !== this.vehicleDetails.model ||
      this.productionYearFormControl.value !== this.vehicleDetails.productionYear ||
      this.descriptionFormControl.value !== this.vehicleDetails.description ||
      this.numberOfSeatsFormControl.value !== this.vehicleDetails.numberOfSeats;
  }

  checkIfFieldsAreValid(): boolean {
    return this.brandFormControl.valid && this.modelFormControl.valid &&
      this.productionYearFormControl.valid && this.descriptionFormControl.valid &&
      this.numberOfSeatsFormControl.valid;
  }

  private initVehicleDetailsFormControls(): void {
    this.brandFormControl = new FormControl(this.vehicleDetails.brand, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(new RegExp('^[A-Za-z0-9]*$'))
    ]);
    this.modelFormControl = new FormControl(this.vehicleDetails.model, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(new RegExp('^[A-Za-z0-9]*$'))
    ]);
    this.productionYearFormControl = new FormControl(this.vehicleDetails.productionYear, [
      Validators.required,
      Validators.min(1960),
      Validators.max(new Date().getFullYear())
    ]);
    this.descriptionFormControl = new FormControl(this.vehicleDetails.description, [
      Validators.pattern(new RegExp('^[A-Za-z ,.\\-!@$%^&()\\[\\]]*$'))
    ]);
    this.numberOfSeatsFormControl = new FormControl(this.vehicleDetails.numberOfSeats, [
      Validators.required,
      Validators.min(2),
      Validators.max(10),
    ]);
  }

}
