import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ConfirmAccountRequest} from '../../../model/api-model';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.less']
})
export class ConfirmAccountComponent implements OnInit {

  token: string;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router) {
    route.queryParams.subscribe(params => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {
    const request: ConfirmAccountRequest = {
      token: this.token
    };
    this.authenticationService.confirmAccount(request).subscribe(() => {
      this.toastrService.success('Account successfully confirmed. Now you can log in');
    }, () => {
      this.toastrService.error('Link is wrong or expired');
    });
    this.router.navigateByUrl('/login');
  }

}
