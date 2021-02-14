import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DirectionDetailsForList} from '../../../../model/api-model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-direction-list-table',
  templateUrl: './direction-list-table.component.html',
  styleUrls: ['./direction-list-table.component.less']
})
export class DirectionListTableComponent {

  @Input()
  items: DirectionDetailsForList[] = [];

  @Output()
  removeDirectionEvent: EventEmitter<string> = new EventEmitter<string>();

  pipe = new DatePipe('pl-PL');

  @Input()
  displayedColumns: string[] = [];

  constructor(private router: Router) { }

  showDate(item: DirectionDetailsForList): string | null {
    const date = new Date(item.travelDate);
    date.setHours(date.getHours() + 1);
    return this.pipe.transform(date, 'dd-MM-yyyy HH:mm');
  }

  redirectToDetails(id: string): void {
    this.router.navigateByUrl('/map/' + id);
  }

  isTravelDateInFuture(date: Date): boolean {
    return new Date(date) > new Date();
  }

  removeDirection(item: DirectionDetailsForList): void {
    this.removeDirectionEvent.emit(item.directionId);
  }

}
