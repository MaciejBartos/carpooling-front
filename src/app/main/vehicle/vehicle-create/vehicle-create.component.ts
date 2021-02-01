import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CreateVehicleRequest} from '../../../model/api-model';
import {VehicleService} from '../../service/vehicle.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.less']
})
export class VehicleCreateComponent {

  brandControl: FormControl;
  modelControl: FormControl;
  productionYearControl: FormControl;
  descriptionControl: FormControl;
  numberOfSeatsControl: FormControl;

  constructor(private vehicleService: VehicleService,
              private toastsService: ToastrService) {
    this.initFormControls();
  }

  createVehicle(): void {
    this.touchAllForms();
    if (!this.checkIfFormsAreValid()) {
      return;
    }
    const request: CreateVehicleRequest = {
      brand: this.brandControl.value,
      model: this.modelControl.value,
      productionYear: this.productionYearControl.value,
      description: this.descriptionControl.value,
      numberOfSeats: this.numberOfSeatsControl.value,
    };
    this.vehicleService.createVehicle(request).subscribe(() => {
      this.toastsService.success('Successfully added vehicle');
    }, () => {
      this.toastsService.error('Something went wrong');
    });
  }

  checkIfFormsAreValid(): boolean {
    return this.brandControl.valid && this.modelControl.valid && this.numberOfSeatsControl.valid &&
      this.productionYearControl.valid && this.descriptionControl.valid;
  }

  touchAllForms(): void {
    this.brandControl.markAsTouched();
    this.modelControl.markAsTouched();
    this.productionYearControl.markAsTouched();
    this.numberOfSeatsControl.markAsTouched();
    this.descriptionControl.markAsTouched();
  }

  initFormControls(): void {
    this.brandControl = new FormControl(null, [
      Validators.maxLength(30),
      Validators.pattern(new RegExp('^[A-Za-z0-9]*$')),
      Validators.required
    ]);
    this.modelControl = new FormControl(null, [
      Validators.maxLength(30),
      Validators.pattern(new RegExp('^[A-Za-z0-9]*$')),
      Validators.required
    ]);
    this.productionYearControl = new FormControl(null, [
      Validators.required,
      Validators.min(1960),
      Validators.max(new Date().getFullYear())
    ]);
    this.descriptionControl = new FormControl(null, [
      Validators.pattern(new RegExp('^[A-Za-z ,.\\-!@$%^&()\\[\\]]*$'))
    ]);
    this.numberOfSeatsControl = new FormControl(null, [
      Validators.min(2),
      Validators.max(10),
      Validators.required
    ]);
  }

  chosenYearHandler(date: any, datePicker?: any): void {
    datePicker.close();
  }
}
