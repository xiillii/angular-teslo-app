import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  formUtils = FormUtils;
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3000);
    });
  }
}
