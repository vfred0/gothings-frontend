import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { Icon } from '@core/enums/icon';
import { RegisterRequestDto } from '@core/dtos/auth/register-request.dto';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { RoutePage } from '@core/enums/route-page';
import { toDto } from '@core/utils/form.util';

@Component({
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    SvgIconComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.page.html',
})
export default class RegisterPage {
  protected readonly Icon = Icon;
  protected readonly Validators = Validators;
  private authService: AuthService;
  private router: Router;
  errorMessage: string;
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({});
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.errorMessage = '';
  }

  onRegister() {
    const registerRequestDto = toDto<RegisterRequestDto>(this.formGroup.value);
    this.authService.register(registerRequestDto).subscribe({
      next: () => this.router.navigate([RoutePage.Home]).then(),
      error: e => (this.errorMessage = e.error.message),
    });
  }

  private getValue(value: string) {
    return this.formGroup.get(value)?.value.inputValue;
  }

  isValidForm(): boolean {
    return this.isCorrectPassword && this.formGroup.valid;
  }

  get isCorrectPassword(): boolean {
    return this.getValue('password') === this.getValue('confirmPassword');
  }

  isDirties(): boolean {
    const password = this.formGroup.get('password')?.dirty;
    const confirmPassword = this.formGroup.get('confirmPassword')?.dirty;
    const check = password !== undefined && confirmPassword !== undefined;
    if (check) {
      return password && confirmPassword;
    }
    return check;
  }

  isInvalid(value: string) {
    return (
      this.formGroup.get(value)?.touched && this.formGroup.get(value)?.invalid
    );
  }

  existsErrorMessage() {
    return this.errorMessage !== '';
  }
}
