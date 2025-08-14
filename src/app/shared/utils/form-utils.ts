import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 2500)
  );
}

export class FormUtils {
  // Expresiones regulares para validaciones
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static slugPattern = '^[a-z0-9_]+(?:-[a-z0-9_]+)*$';
  static genderPattern = '^(men|women|kid|unisex)$';

  private static getTextErrors(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return 'El mínimo de caracteres es ' + errors[key].requiredLength;
        case 'min':
          return 'El valor mínimo es ' + errors[key].min;
        case 'email':
          return 'El formato del email es inválido';
        case 'pattern':
          return 'El formato es inválido';
        case 'emailTaken':
          return 'El email ya está en uso';
        case 'noStrider':
          return 'El valor no puede ser "strider"';
        case 'slug':
          return 'El formato del slug no es válido';
      }
    }
    return null;
  }

  static isValidField(formGroup: FormGroup, fieldName: string): boolean | null {
    return !(
      formGroup.controls[fieldName].errors &&
      formGroup.controls[fieldName].touched
    );
  }

  static getFieldError(formGroup: FormGroup, fieldName: string): string | null {
    if (!formGroup.controls[fieldName].errors) {
      return null;
    }

    const errors = formGroup.controls[fieldName].errors ?? {};

    return this.getTextErrors(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return !(
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) {
      return null;
    }
    const errors = formArray.controls[index].errors ?? {};

    return this.getTextErrors(errors);
  }

  static isFieldOneEqualsFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const value1 = formGroup.get(fieldOne)?.value;
      const value2 = formGroup.get(fieldTwo)?.value;
      return value1 === value2 ? null : { notMatching: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Checking server response...');
    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static noStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;

    if (formValue === 'strider') {
      return { noStrider: true };
    }
    return null;
  }
}
