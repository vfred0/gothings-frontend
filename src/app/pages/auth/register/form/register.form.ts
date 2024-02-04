import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { Icon } from '@core/enums/icon';
import { RegisterRequestDto } from '@core/dtos/auth/register-request.dto';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'gothings-register',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    SvgIconComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.form.html',
})
export class RegisterForm {
  protected readonly Icon = Icon;
  protected readonly Validators = Validators;
  private readonly registerRequestDto: RegisterRequestDto;
  formGroup: FormGroup;
  @Output() register: EventEmitter<RegisterRequestDto>;

  constructor() {
    this.registerRequestDto = {} as RegisterRequestDto;
    this.register = new EventEmitter<RegisterRequestDto>();
    this.formGroup = new FormGroup({});
  }

  onRegister() {
    this.registerRequestDto.names =
      this.formGroup.get('names')?.value.inputValue;
    this.registerRequestDto.username =
      this.formGroup.get('username')?.value.inputValue;
    this.registerRequestDto.password =
      this.formGroup.get('password')?.value.inputValue;
    this.register.emit(this.registerRequestDto);
  }

  isValidForm(): boolean {
    return this.isCorrectPassword && this.formGroup.valid;
  }

  get isCorrectPassword(): boolean {
    return (
      this.formGroup.get('password')?.value.inputValue ===
      this.formGroup.get('confirmPassword')?.value.inputValue
    );
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
}
