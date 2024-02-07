import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Icon } from '@core/enums/icon';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { LoginRequestDto } from '@core/dtos/auth/login-request.dto';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { AppRoute } from '@core/enums/app-route';

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
  private readonly loginRequestDto: LoginRequestDto;
  private router: Router;
  authService: AuthService;
  existsErrorInLogin: boolean;
  formGroup: FormGroup;

  @Output() requestLogin: EventEmitter<LoginRequestDto>;

  constructor() {
    this.loginRequestDto = {} as LoginRequestDto;
    this.requestLogin = new EventEmitter<LoginRequestDto>();
    this.router = inject(Router);
    this.formGroup = new FormGroup({});
    this.authService = inject(AuthService);
    this.existsErrorInLogin = false;
  }

  onLogin() {
    this.loginRequestDto.username = this.getValue('username');
    this.loginRequestDto.password = this.getValue('password');
    if (this.formGroup.valid) {
      this.authService.login(this.loginRequestDto).subscribe({
        next: () => this.router.navigate([AppRoute.Home]).then(),
        error: () => {
          this.existsErrorInLogin = true;
        },
      });
    }
    this.formGroup.valueChanges.subscribe(() => {
      this.existsErrorInLogin = false;
    });
  }

  private getValue(value: string) {
    return this.formGroup.get(value)?.value.inputValue;
  }

  onRegister() {
    this.router.navigate([AppRoute.AuthRegister]).then();
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
}
