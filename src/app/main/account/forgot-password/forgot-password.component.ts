import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AccountService} from '../../service/account.service';
import {SendResetPasswordEmailRequest} from '../../../model/api-model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {

  emailControl: FormControl;

  constructor(private accountService: AccountService,
              private toastrService: ToastrService) {
    this.emailControl = new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
      ]
    });
  }

  ngOnInit(): void {
  }

  sendResetPasswordEmail(): void {
    if (!this.emailControl.valid) {
      return;
    }
    const request: SendResetPasswordEmailRequest = {
      email: this.emailControl.value
    };
    this.accountService.sendResetPasswordEmail(request).subscribe(() => {
      this.toastrService.success('Reset password link successfully send');
      this.emailControl.setValue('');
    }, error => {
      if (error.error.error === 'account-does-not-exist') {
        this.toastrService.error('Account with given email does not exist');
      }
      else {
        this.toastrService.error('Something went wrong');
      }
    });
  }
}
