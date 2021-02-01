import {Component} from '@angular/core';
import {AccountService} from '../../service/account.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, Validators} from '@angular/forms';
import {arePasswordTheSameValidator, isNewPasswordDiffersFromCurrent} from '../../../share/validator/password/password-validators';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetPasswordRequest, VerifyResetPasswordTokenRequest} from '../../../model/api-model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent {

  passwordControl: FormControl;
  repeatNewPasswordControl: FormControl;
  differsPassword;
  tokenValid;
  token: string;

  constructor(private accountService: AccountService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
    this.tokenValid = false;
    this.differsPassword = true;
    route.queryParams.subscribe(params => {
      this.token = params.token;
      this.verifyToken();
    });
    this.passwordControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        isNewPasswordDiffersFromCurrent(this.differsPassword)
      ]
    });
    this.repeatNewPasswordControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        arePasswordTheSameValidator(this.passwordControl)
      ]
    });
  }

  changePassword(): void {
    this.passwordControl.markAsTouched();
    this.repeatNewPasswordControl.markAsTouched();
    this.repeatNewPasswordControl.updateValueAndValidity();
    if (!(this.passwordControl.valid && this.repeatNewPasswordControl.valid)) {
      return;
    }
    if (this.passwordControl.value !== this.repeatNewPasswordControl.value) {
      return;
    }
    const request: ResetPasswordRequest = {
      token: this.token,
      password: this.passwordControl.value,
      repeatPassword: this.repeatNewPasswordControl.value
    };

    this.accountService.resetPassword(request).subscribe(() => {
      this.toastrService.success('Password changed successfully');
      this.passwordControl.setValue(null);
      this.passwordControl.markAsUntouched();
      this.repeatNewPasswordControl.setValue(null);
      this.repeatNewPasswordControl.markAsUntouched();
    }, error => {
      if (error.error.error === 'account-does-not-exist') {
        this.toastrService.error('Invalid token');
        this.router.navigateByUrl('');
      } else if (error.error.error === 'account-new-password-same-as-old') {
        this.differsPassword = false;
        this.passwordControl.markAsPristine();
        this.passwordControl.updateValueAndValidity();
      } else {
        this.toastrService.error('Something went wrong, try again');
      }
    });
  }

  private verifyToken(): void {
    const request: VerifyResetPasswordTokenRequest = {
      token: this.token
    };
    this.accountService.verifyResetPasswordToken(request).subscribe(() => {
      this.tokenValid = true;
    }, error => {
      if (error.error.error === 'account-does-not-exist') {
        this.toastrService.error('Token is not valid');
      } else {
        this.toastrService.error('Something went wrong');
      }
    });
  }

}
