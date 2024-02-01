import { Component } from '@angular/core';
import { Icon } from '@core/enums/icon';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TypeButton } from '@core/enums/type.button';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { LoginRequestDto } from '@core/dtos/auth/login.request.dto';

@Component({
  selector: 'gothings-login-form',
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
  protected readonly TypeButton = TypeButton;
  private readonly loginRequestDto: LoginRequestDto;

  constructor() {
    this.loginRequestDto = {} as LoginRequestDto;
  }

  onUserNameChanged(username: string) {
    this.loginRequestDto.username = username;
  }

  onPasswordChanged(password: string) {
    this.loginRequestDto.password = password;
  }

  onLogin() {
    if (this.isValidLoginRequest) {
      console.log('loginRequestDto', this.loginRequestDto);
    }
  }

  get isValidLoginRequest(): boolean {
    return this.loginRequestDto.username.length > 0 && this.loginRequestDto.password.length > 0;
  }
}
