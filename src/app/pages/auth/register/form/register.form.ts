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
    this.registerRequestDto.names = this.getValue('names');
    this.registerRequestDto.username = this.getValue('username');
    this.registerRequestDto.password = this.getValue('password');
    this.register.emit(this.registerRequestDto);
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
}
