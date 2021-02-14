import {Component} from '@angular/core';
import {DirectionDetailsForList} from '../../../model/api-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-directions-assigned-to-user',
  templateUrl: './directions-assigned-to-user.component.html',
  styleUrls: ['./directions-assigned-to-user.component.less']
})
export class DirectionsAssignedToUserComponent {

  renderFieldInTable: string[] = ['originAddress', 'destinationAddress', 'driverInfo', 'travelDate', 'detailsAction'];

  directions: DirectionDetailsForList[];

  constructor(private activatedRoute: ActivatedRoute) {
    this.directions = activatedRoute.snapshot.data.directions.directions;
  }


}
