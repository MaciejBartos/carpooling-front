import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DirectionDetailsForList} from '../../../model/api-model';

@Component({
  selector: 'app-map-list',
  templateUrl: './direction-list.component.html',
  styleUrls: ['./direction-list.component.less']
})
export class DirectionListComponent {

  directions: DirectionDetailsForList[];

  constructor(private activatedRoute: ActivatedRoute) {
    this.directions = activatedRoute.snapshot.data.directions.directions;
  }

}
