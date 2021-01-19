import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

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

export function isCurrentPasswordCorrect(currentPasswordCorrect: boolean): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.untouched) {
      return null;
    }
    const result = currentPasswordCorrect && control.dirty;
    return result ? null : {isCurrentPasswordCorrect: {valid: false}};
  };
}
