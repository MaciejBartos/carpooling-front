import {Component} from '@angular/core';
import {DirectionDetailsForList} from '../../../model/api-model';
import {ActivatedRoute} from '@angular/router';
import {DirectionService} from '../../service/direction.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-directions-created-by-user',
  templateUrl: './directions-created-by-user.component.html',
  styleUrls: ['./directions-created-by-user.component.less']
})
export class DirectionsCreatedByUserComponent {

  renderFieldInTable: string[] = ['originAddress', 'destinationAddress', 'travelDate', 'detailsAction', 'removeAction'];

  directions: DirectionDetailsForList[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private directionService: DirectionService,
              private toastrService: ToastrService) {
    this.directions = activatedRoute.snapshot.data.directions.directions;
  }

  private fetchData(): void {
    this.directionService.getDirectionsCreatedByCurrentUser().subscribe(result => {
      this.directions = result.directions;
    });
  }

  removeDirection(id: string): void {
    this.directionService.deleteDirection(id).subscribe(() => {
      this.toastrService.success('Successfully removed direction');
      this.fetchData();
    });
  }

}
