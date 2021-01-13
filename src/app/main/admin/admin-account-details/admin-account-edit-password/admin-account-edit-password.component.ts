import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../service/account.service';
import {ChangePasswordAsAdminRequest} from '../../../../model/api-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-account-edit-password',
  templateUrl: './admin-account-edit-password.component.html',
  styleUrls: ['./admin-account-edit-password.component.less']
})
export class AdminAccountEditPasswordComponent implements OnInit {

  newPasswordControl: FormControl;
  repeatNewPasswordControl: FormControl;
  accountId: string;
  differsPassword = true;

  constructor(private tokenStorage: TokenStorageService,
              private toastrService: ToastrService,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute) {
    this.accountId = activatedRoute.snapshot.params.id;
    this.newPasswordControl = new FormControl(null, {
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
        arePasswordTheSameValidator(this.newPasswordControl)
      ]
    });
  }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.newPasswordControl.markAsTouched();
    this.repeatNewPasswordControl.markAsTouched();
    this.repeatNewPasswordControl.updateValueAndValidity();
    if (!this.checkIfControllersAreValid()) {
      return;
    }
    if (this.newPasswordControl.value !== this.repeatNewPasswordControl.value) {
      return;
    }
    const request: ChangePasswordAsAdminRequest = {
      accountId: this.accountId,
      password: this.newPasswordControl.value,
      repeatPassword: this.repeatNewPasswordControl.value
    };

    this.accountService.updateAccountPasswordAsAdmin(request).subscribe(() => {
      this.toastrService.success('Password changed successfully');
      this.newPasswordControl.setValue(null);
      this.newPasswordControl.markAsUntouched();
      this.repeatNewPasswordControl.setValue(null);
      this.repeatNewPasswordControl.markAsUntouched();
    }, error => {
      if (error.error.error === 'account-new-password-same-as-old') {
        this.differsPassword = false;
        this.newPasswordControl.markAsPristine();
        this.newPasswordControl.updateValueAndValidity();
      } else {
        this.toastrService.error('Something went wrong, try again');
      }
    });
  }

  checkIfControllersAreValid(): boolean {
    return this.newPasswordControl.valid && this.repeatNewPasswordControl.valid;
  }
}

export function arePasswordTheSameValidator(newPassword: FormControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const result = newPassword.value === control.value;
    return result ? null : {arePasswordTheSame: {valid: false}};
  };
}

export function isNewPasswordDiffersFromCurrent(samePassword: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.untouched) {
      return null;
    }
    const result = samePassword && control.dirty;
    return result ? null : {isNewPasswordDiffersFromCurrent: {valid: false}};
  };
}
