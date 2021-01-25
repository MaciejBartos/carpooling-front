import {AbstractControl, ValidatorFn} from '@angular/forms';

export function isValueUnique(unique: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.untouched) {
      return null;
    }
    const result = unique && control.dirty;
    return result ? null : {valueUnique: {valid: false}};
  };
}
