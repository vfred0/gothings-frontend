import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Icon } from '@core/enums/icon';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { LoginRequestDto } from '@core/dtos/auth/login-request.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'gothings-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    SvgIconComponent,
  ],
  templateUrl: './login.form.html',
})
export default class LoginForm {
  protected readonly Icon = Icon;
  protected readonly Validators = Validators;
  private readonly loginRequestDto: LoginRequestDto;
  private router: Router;
  formGroup: FormGroup;

  @Output() requestLogin: EventEmitter<LoginRequestDto>;

  constructor() {
    this.loginRequestDto = {} as LoginRequestDto;
    this.requestLogin = new EventEmitter<LoginRequestDto>();
    this.router = inject(Router);
    this.formGroup = new FormGroup({});
  }

  onLogin() {
    this.loginRequestDto.username = this.getValue('username');
    this.loginRequestDto.password = this.getValue('password');
    this.requestLogin.emit(this.loginRequestDto);
  }

  private getValue(value: string) {
    return this.formGroup.get(value)?.value.inputValue;
  }

  onRegister() {
    this.router.navigate(['auth/register']);
  }
}
