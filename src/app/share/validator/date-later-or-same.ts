import {AbstractControl, ValidatorFn} from '@angular/forms';

export function isDateLaterOrSame(date: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value >= date ? null : {dateLater: {valid: false}};
  };
}
