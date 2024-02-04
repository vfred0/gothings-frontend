import { Component, inject } from '@angular/core';
import LoginForm from '@pages/auth/login/form/login.form';
import { RouterLink } from '@angular/router';
import { LoginRequestDto } from '@core/dtos/auth/login-request.dto';
import { AuthService } from '@shared/services/auth.service';

@Component({
  standalone: true,
  imports: [LoginForm, RouterLink],
  templateUrl: './login.page.html',
})
export default class LoginPage {
  authService: AuthService = inject(AuthService);
  login(loginRequestDto: LoginRequestDto) {
    this.authService.login(loginRequestDto).subscribe();
  }
}
