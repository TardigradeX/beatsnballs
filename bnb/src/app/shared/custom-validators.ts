import { FormControl } from '@angular/forms';

export class CustomValidators {

  static mailFormat(control: FormControl): ValidationResult {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { 'incorrectMailFormat': true };
    }
    return null;
  }

  static lowerCaseLetters(control: FormControl): ValidationResult {
    let LOWER_CASE_REGEXP = /^[a-z]+$/;
    if (control.value !== '' && !LOWER_CASE_REGEXP.test(control.value)) {
      return { 'incorrectLowerCaseFormat': true };
    }
    return null;
  }

  static onlyNumbers(control: FormControl): ValidationResult {
    let NUMBER_REGEXP = /^[0-9]+$/;
    if (control.value !== '' && !NUMBER_REGEXP.test(control.value)) {
      return { 'incorrectNumberFormat': true };
    }
    return null;
  }

  static onlyNumbersOrNothing(control: FormControl): ValidationResult {
    let NUMBER_REGEXP = /^[0-9]+$/;
    if (control.value === '') {
      return null;
    }
    if (!NUMBER_REGEXP.test(control.value)) {
      return { 'incorrectNumberFormat': true };
    }
    return null;
  }

  static numberInDayRange(control: FormControl): ValidationResult {
    let NUMBER_REGEXP = /^[0-9]+$/;
    if (control.value !== '' && !NUMBER_REGEXP.test(control.value)) {
      return { 'incorrectDayFormat': true };
    } else {
      let number = +control.value;
      if (number < 1 || number > 31) {
        return { 'incorrectDayFormat': true };
      } else {
        return null;
      }
    }
  }

  static numberInYearRange(control: FormControl): ValidationResult {
    let NUMBER_REGEXP = /^[0-9]+$/;
    if (control.value !== '' && !NUMBER_REGEXP.test(control.value)) {
      return { 'incorrectYearFormat': true };
    } else {
      let number = +control.value;
      if (number < 1900 || number > 2016) {
        return { 'incorrectYearFormat': true };
      } else {
        return null;
      }
    }
  }

  static numberInMonthRange(control: FormControl): ValidationResult {
    let NUMBER_REGEXP = /^[0-9]+$/;
    if (control.value !== '' && !NUMBER_REGEXP.test(control.value)) {
      return { 'incorrectMonthFormat': true };
    } else {
      let number = +control.value;
      if (number < 1 || number > 12) {
        return { 'incorrectMonthFormat': true };
      } else {
        return null;
      }
    }
  }

  static sameAs(control: FormControl, control2: FormControl): ValidationResult {
    if (control.value == control2.value) {
      return null;
    } else {
      return { 'notMatching': true };
    }
  }

}

interface ValidationResult {
  [key: string]: boolean;
}
