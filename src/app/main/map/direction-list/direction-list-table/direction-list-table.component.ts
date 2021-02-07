import {Component, Input} from '@angular/core';
import {DirectionDetailsForList} from '../../../../model/api-model';
import {DatePipe, formatDate} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-direction-list-table',
  templateUrl: './direction-list-table.component.html',
  styleUrls: ['./direction-list-table.component.less']
})
export class DirectionListTableComponent {

  @Input()
  items: DirectionDetailsForList[] = [];

  pipe = new DatePipe('pl-PL');

  displayedColumns: string[] = ['originAddress', 'destinationAddress', 'driverInfo', 'travelDate', 'action'];

  constructor(private router: Router) { }

  showDate(item: DirectionDetailsForList): string | null {
    return this.pipe.transform(item.travelDate, 'dd-MM-yyyy hh:mm');
  }

  redirectToDetails(id: string): void {
    this.router.navigateByUrl('/map/' + id);
  }

}
