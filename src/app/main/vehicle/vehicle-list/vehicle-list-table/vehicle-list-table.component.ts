import {Component, Input} from '@angular/core';
import {VehicleDetailsForList} from '../../../../model/api-model';
import {Router} from '@angular/router';
import {VehicleService} from '../../../service/vehicle.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-list-table',
  templateUrl: './vehicle-list-table.component.html',
  styleUrls: ['./vehicle-list-table.component.less']
})
export class VehicleListTableComponent {

  @Input()
  items: VehicleDetailsForList[];
  displayedColumns: string[] = ['brand', 'model', 'action'];

  constructor(private router: Router,
              private vehicleService: VehicleService,
              private toastsService: ToastrService) { }

  fetchData(): void {
    this.vehicleService.getVehicleAssignedToAccount().subscribe(response => {
      this.items = response.vehicles;
    });
  }

  redirectToDetails(id: string): void {
    this.router.navigateByUrl('/vehicle/' + id);
  }

  deleteVehicle(id: string): void {
    this.vehicleService.deleteVehicle(id).subscribe(() => {
      this.toastsService.success('Vehicle successfully deleted');
      this.fetchData();
    }, error => {
      if (error.error.error === 'vehicle-does-not-exist') {
        this.toastsService.error('Vehicle does not exist');
        this.fetchData();
      }
    });
  }

}
