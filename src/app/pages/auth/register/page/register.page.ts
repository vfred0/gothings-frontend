import { Component, inject } from '@angular/core';
import { RegisterForm } from '@pages/auth/register/form/register.form';
import { AuthService } from '@shared/services/auth.service';
import { RegisterRequestDto } from '@core/dtos/auth/register-request.dto';

@Component({
  standalone: true,
  imports: [RegisterForm],
  templateUrl: './register.page.html',
})
export default class RegisterPage {
  private authService: AuthService = inject(AuthService);

  onRegister(registerRequestDto: RegisterRequestDto) {
    this.authService.register(registerRequestDto).subscribe();
  }
}
