import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
  selector: 'app-form-error-label',
  imports: [],
  templateUrl: './form-error-label.component.html',
})
export class FormErrorLabelComponent {
  control = input.required<AbstractControl>();

  get errorMessage() {
    const errors = this.control()?.errors || {};

    return this.control()?.touched && Object.keys(errors).length > 0
      ? FormUtils.getTextErrors(errors)
      : null;
  }
}
