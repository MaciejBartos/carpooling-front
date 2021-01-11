import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Form, FormControl, Validators} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  loginControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  emailControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  passwordControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  repeatedPasswordControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  nameControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  surnameControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  cityControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  streetControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  houseNumberControl: FormControl = new FormControl('', [
    Validators.maxLength(20),
    Validators.required
  ]);
  birthDate: Date = new Date();

  constructor(private  authenticationService: AuthenticationService) {}

  ngOnInit(): void {
  }

  registerAccount(): void {
    const signUp = {
      login: this.loginControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
      name: this.nameControl.value,
      surname: this.surnameControl.value,
      yearsOld: new Date().getFullYear() - this.birthDate.getFullYear(),
      city: this.cityControl.value,
      street: this.streetControl.value,
      houseNumber: this.houseNumberControl.value
    };
    console.log(signUp);
    this.authenticationService.registerUser(signUp);
  }
}
