import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../service/token-storage.service';
import {AccountService} from '../../../service/account.service';
import {ChangePasswordRequest} from '../../../../model/api-model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-account-password',
  templateUrl: './edit-account-password.component.html',
  styleUrls: ['./edit-account-password.component.less']
})
export class EditAccountPasswordComponent implements OnInit {

  currentPasswordControl: FormControl;
  newPasswordControl: FormControl;
  repeatNewPasswordControl: FormControl;

  currentPasswordCorrect = true;
  differsPassword = true;

  constructor(private tokenStorage: TokenStorageService,
              private toastrService: ToastrService,
              private accountService: AccountService) {
    this.currentPasswordControl = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        isCurrentPasswordCorrect(this.currentPasswordCorrect)
      ]
    });
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
      ]});
  }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.currentPasswordControl.markAsTouched();
    this.newPasswordControl.markAsTouched();
    this.repeatNewPasswordControl.markAsTouched();
    this.repeatNewPasswordControl.updateValueAndValidity();
    if (!(this.currentPasswordControl.valid && this.newPasswordControl.valid && this.repeatNewPasswordControl.valid)) {
      return;
    }
    if (this.newPasswordControl.value !== this.repeatNewPasswordControl.value) {
      return;
    }
    const request: ChangePasswordRequest = {
      accountId: this.tokenStorage.getAccountId(),
      oldPassword: this.currentPasswordControl.value,
      newPassword: this.newPasswordControl.value,
      repeatPassword: this.repeatNewPasswordControl.value
    };

    this.accountService.updateAccountPassword(request).subscribe(data => {
      this.toastrService.success('Password changed successfully');
      this.currentPasswordControl.setValue(null);
      this.currentPasswordControl.markAsUntouched();
      this.newPasswordControl.setValue(null);
      this.newPasswordControl.markAsUntouched();
      this.repeatNewPasswordControl.setValue(null);
      this.repeatNewPasswordControl.markAsUntouched();
    }, error => {
      if (error.error.error === 'account-wrong-current-password') {
        this.currentPasswordCorrect = false;
        this.currentPasswordControl.markAsPristine();
        this.currentPasswordControl.updateValueAndValidity();
      } else if (error.error.error === 'account-new-password-same-as-old') {
        this.differsPassword = false;
        this.newPasswordControl.markAsPristine();
        this.newPasswordControl.updateValueAndValidity();
      } else {
        this.toastrService.error('Something went wrong, try again');
      }
    });
  }
}

export function arePasswordTheSameValidator(newPassword: FormControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const result = newPassword.value === control.value;
    return result ? null : {arePasswordTheSame: {valid: false}};
  };
}

export function isCurrentPasswordCorrect(currentPasswordCorrect: boolean): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.untouched) {
      return null;
    }
    const result = currentPasswordCorrect && control.dirty;
    return result ? null : {isCurrentPasswordCorrect: {valid: false}};
  };
}

export function isNewPasswordDiffersFromCurrent(samePassword: boolean): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.untouched) {
      return null;
    }
    const result = samePassword && control.dirty;
    return result ? null : {isNewPasswordDiffersFromCurrent: {valid: false}};
  };
}
