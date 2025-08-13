import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  formUtils = FormUtils;
  fb = inject(FormBuilder);
  hasError = signal<boolean>(false);
  isPosting = signal<boolean>(false);
  router = inject(Router);
  authService = inject(AuthService);

  registerForm = this.fb.group(
    {
      fullname: ['', [Validators.required, Validators.minLength(1)]],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: this.formUtils.isFieldOneEqualsFieldTwo(
        'password',
        'repeatPassword'
      ),
    }
  );

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      this.registerForm.markAllAsTouched();
      setTimeout(() => {
        this.hasError.set(false);
      }, 5000);
      return;
    }

    const {
      fullname = '',
      email = '',
      password = '',
    } = this.registerForm.value;

    this.authService
      .register(fullname!, email!, password!)
      .subscribe((isRegistered) => {
        if (isRegistered) {
          this.router.navigate(['/']);
          return;
        }
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 5000);
      });
  }
}
