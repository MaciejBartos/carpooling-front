import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../service/authentication.service';
import { FormControl, Validators} from '@angular/forms';
import {isValueUnique} from '../../../share/validator/unique-value';
import {arePasswordTheSameValidator} from '../../../share/validator/password/password-validators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  loginControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  repeatedPasswordControl: FormControl;
  nameControl: FormControl;
  surnameControl: FormControl;
  cityControl: FormControl;
  streetControl: FormControl;
  houseNumberControl: FormControl;
  birthDate: FormControl;

  uniqueLogin = true;
  uniqueEmail = true;

  constructor(private authenticationService: AuthenticationService,
              private toastrService: ToastrService,
              private router: Router) {
    this.loginControl = new FormControl('', [
      Validators.maxLength(64),
      Validators.minLength(6),
      Validators.required,
      isValueUnique(this.uniqueLogin)
    ]);
    this.emailControl = new FormControl('', [
      Validators.email,
      Validators.required,
      isValueUnique(this.uniqueEmail)
    ]);
    this.passwordControl = new FormControl('', [
      Validators.maxLength(64),
      Validators.minLength(8),
      Validators.required,
    ]);
    this.repeatedPasswordControl = new FormControl('', [
      Validators.maxLength(64),
      Validators.minLength(8),
      Validators.required,
      arePasswordTheSameValidator(this.passwordControl)
    ]);
    this.nameControl = new FormControl('', [
      Validators.maxLength(64),
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-zążźęćół]+$'))
    ]);
    this.surnameControl = new FormControl('', [
      Validators.maxLength(64),
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-zążźęćół]+$'))
    ]);
    this.birthDate = new FormControl(null, [
      Validators.required,
    ]);
    this.cityControl = new FormControl('', [
      Validators.maxLength(64),
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-zążźęćół ]+$'))
    ]);
    this.streetControl = new FormControl('', [
      Validators.maxLength(64),
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-zążźęćół ]+$'))
    ]);
    this.houseNumberControl = new FormControl('', [
      Validators.maxLength(10),
      Validators.required,
      Validators.pattern(new RegExp('^[1-9][0-9]*'))
    ]);
  }

  ngOnInit(): void {
  }

  registerAccount(): void {
    this.markAllFormControlsAsTouched();
    if (!this.areFormControlsValid()) {
      return;
    }
    const signUp = {
      login: this.loginControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
      name: this.nameControl.value,
      surname: this.surnameControl.value,
      birthDate: this.getDateWithCorrectTimeOffset(),
      city: this.cityControl.value,
      street: this.streetControl.value,
      houseNumber: this.houseNumberControl.value
    };
    this.authenticationService.registerUser(signUp).subscribe(() => {
      this.router.navigateByUrl('');
      this.toastrService.success('Successfully registered. To finish registration process your have to confirm your account');
    }, result => {
      if (result.error.error === 'account.email.used.validation.exception') {
        this.uniqueEmail = false;
        this.emailControl.markAsPristine();
        this.emailControl.updateValueAndValidity();
      } else if (result.error.error === 'account.login.used.validation.exception') {
        this.uniqueLogin = false;
        this.loginControl.markAsPristine();
        this.loginControl.updateValueAndValidity();
      } else {
        this.toastrService.error('Something went wrong. Please try again');
      }
    });
  }

  areFormControlsValid(): boolean {
    return this.loginControl.valid && this.emailControl.valid && this.passwordControl.valid && this.repeatedPasswordControl.valid &&
      this.nameControl.valid && this.surnameControl.valid && this.birthDate.valid && this.cityControl.valid &&
      this.cityControl.valid && this.streetControl.valid && this.houseNumberControl.valid;
  }

  getDateWithCorrectTimeOffset(): Date {
    this.birthDate.value.setHours(this.birthDate.value.getHours() + 1);
    return this.birthDate.value;
  }

  markAllFormControlsAsTouched(): void {
    this.loginControl.markAsTouched();
    this.emailControl.markAsTouched();
    this.passwordControl.markAsTouched();
    this.repeatedPasswordControl.markAsTouched();
    this.nameControl.markAsTouched();
    this.surnameControl.markAsTouched();
    this.birthDate.markAsTouched();
    this.cityControl.markAsTouched();
    this.streetControl.markAsTouched();
    this.houseNumberControl.markAsTouched();
  }
}
