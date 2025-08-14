import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-error-label',
  imports: [],
  templateUrl: './form-error-label.component.html',
})
export class FormErrorLabelComponent {
  errorMessage = input.required<string>();
}
