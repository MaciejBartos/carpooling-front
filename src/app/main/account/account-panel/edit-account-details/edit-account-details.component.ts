import {Component, OnInit} from '@angular/core';
import {AccountDetails} from '../../../../model/api-model';
import {ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {AccountService} from '../../../service/account.service';
import {PersonalDataService} from '../../../service/personal-data.service';
import {AddressService} from '../../../service/address.service';
import { forkJoin } from 'rxjs';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-edit-account-details',
  templateUrl: './edit-account-details.component.html',
  styleUrls: ['./edit-account-details.component.less']
})
export class EditAccountDetailsComponent implements OnInit {

  accountDetails: AccountDetails;
  emailFormControl: FormControl;
  nameFormControl: FormControl;
  surnameFormControl: FormControl;
  yearsFormControl: FormControl;
  cityFormControl: FormControl;
  streetFormControl: FormControl;
  houseNumberFormControl: FormControl;


  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private personalDataService: PersonalDataService,
              private addressService: AddressService,
              private tokenStorage: TokenStorageService) {
    this.accountDetails = this.activatedRoute.snapshot.data.account;
    this.initAccountFormControls();
  }

  ngOnInit(): void {
  }

  save(): void {
    const requestsList = [];
    if (this.emailFormControl.dirty) {
      const request = {
        id: this.accountDetails.account.id,
        email: this.emailFormControl.value,
        version: this.accountDetails.account.version
      };
      requestsList.push(this.accountService.updateAccountInformation(request));
    }
    if (this.nameFormControl.dirty || this.surnameFormControl.dirty || this.yearsFormControl.dirty) {
      const request = {
        id: this.accountDetails.personalData.id,
        name: this.nameFormControl.value,
        surname: this.surnameFormControl.value,
        yearsOld: this.yearsFormControl.value,
        version: this.accountDetails.personalData.version
      };
      requestsList.push(this.personalDataService.updatePersonalData(request));
    }
    if (this.cityFormControl.dirty || this.streetFormControl.dirty || this.houseNumberFormControl.dirty) {
      const request = {
        id: this.accountDetails.address.id,
        city: this.cityFormControl.value,
        street: this.streetFormControl.value,
        houseNumber: this.houseNumberFormControl.value,
        version: this.accountDetails.address.version
      };
      requestsList.push(this.addressService.updateAddress(request));
    }
    forkJoin(requestsList).subscribe(results => {
      this.accountService.getAccountDetailsByLogin(this.tokenStorage.getUserLogin()).subscribe(
        account => {
          this.accountDetails = account;
          this.initAccountFormControls();
        });
    });
  }

  checkIfFieldsAreValid(): boolean {
    return this.emailFormControl.valid && this.cityFormControl.valid &&
      this.streetFormControl.valid && this.houseNumberFormControl.valid &&
      this.nameFormControl.valid && this.surnameFormControl.valid &&
      this.yearsFormControl.valid;
  }

  initAccountFormControls(): void {
    this.emailFormControl = new FormControl(this.accountDetails.account.email, {
      validators: [
        Validators.required,
        Validators.email,
      ]
    });
    this.nameFormControl = new FormControl(this.accountDetails.personalData.name, {
      validators: [
        Validators.required,
        Validators.pattern(new RegExp('^[A-Z][a-z]+$')),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]
    });
    this.surnameFormControl = new FormControl(this.accountDetails.personalData.surname, {
      validators: [
        Validators.required,
        Validators.pattern(new RegExp('^[A-Z][a-z]+$')),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]
    });
    this.yearsFormControl = new FormControl(this.accountDetails.personalData.yearsOld, {
      validators: [
        Validators.required,
        Validators.pattern(new RegExp('^[1-9][0-9]?'))
      ]
    });
    this.cityFormControl = new FormControl(this.accountDetails.address.city, {
      validators: [
        Validators.required,
        Validators.pattern(new RegExp('^[A-Z][a-z]+$')),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]
    });
    this.streetFormControl = new FormControl(this.accountDetails.address.street, {
      validators: [
        Validators.required,
        Validators.pattern(new RegExp('^[A-Z][a-z]+$')),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]
    });
    this.houseNumberFormControl = new FormControl(this.accountDetails.address.houseNumber, {
      validators: [
        Validators.required,
        Validators.pattern(new RegExp('^[1-9][0-9]+$')),
        Validators.minLength(2),
        Validators.maxLength(30)
      ]
    });
  }
}
