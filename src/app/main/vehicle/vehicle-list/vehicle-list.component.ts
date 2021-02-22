import {Component} from '@angular/core';
import {VehicleDetailsForList} from '../../../model/api-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.less']
})
export class VehicleListComponent {

  vehicles: VehicleDetailsForList[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.vehicles = this.activatedRoute.snapshot.data.vehicles.vehicles;
  }

}
