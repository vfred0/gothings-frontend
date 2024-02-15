import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Icon } from '@core/enums/icon';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { LoginRequestDto } from '@core/dtos/auth/login-request.dto';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { AppRoutePage } from '@core/enums/app-route-page';
import { toDto } from '@core/utils/form.util';

@Component({
  selector: 'gothings-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    SvgIconComponent,
  ],
  templateUrl: './login.page.html',
})
export default class LoginPage {
  protected readonly Icon = Icon;
  protected readonly Validators = Validators;
  private router: Router;
  authService: AuthService;
  existsErrorInLogin!: boolean;
  errorMessage!: string;
  formGroup: FormGroup;

  @Output() requestLogin: EventEmitter<LoginRequestDto>;

  constructor() {
    this.requestLogin = new EventEmitter<LoginRequestDto>();
    this.router = inject(Router);
    this.formGroup = new FormGroup({});
    this.authService = inject(AuthService);
  }

  onLogin() {
    if (this.formGroup.valid) {
      const loginRequestDto = toDto<LoginRequestDto>(this.formGroup.value);
      this.authService.login(loginRequestDto).subscribe({
        next: () => this.router.navigate([AppRoutePage.Home]).then(),
        error: error => {
          this.errorMessage = error.error.message;
          this.existsErrorInLogin = true;
        },
      });
    }
    this.formGroup.valueChanges.subscribe(() => {
      this.existsErrorInLogin = false;
    });
  }

  onRegister() {
    this.router.navigate([AppRoutePage.AuthRegister]).then();
  }

  existsErrorInUsername() {
    return this.isDirty('username') && this.formGroup.get('username')?.invalid;
  }

  existsErrorInPassword() {
    return this.isDirty('password') && this.formGroup.get('password')?.invalid;
  }

  private isDirty(value: string) {
    const dirty = this.formGroup.get(value)?.dirty;
    const check = dirty !== undefined;
    if (check) {
      return dirty;
    }
    return check;
  }

  existErrorMessage() {
    return this.errorMessage !== '';
  }
}
