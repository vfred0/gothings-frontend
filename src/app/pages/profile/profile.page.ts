import { Component, inject } from '@angular/core';
import { ButtonSelectImageComponent } from '@shared/components/button/button-select-image/button-select-image.component';
import { InputComponent } from '@shared/components/input/input.component';
import { Icon } from '@core/enums/icon';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { ImageService } from '@shared/services/image.service';
import { UserService } from '@shared/services/user.service';
import { UserDto } from '@core/dtos/user.dto';
import { SelectComponent } from '@shared/components/select/select.component';
import { toDto } from '@core/utils/form.util';

@Component({
  selector: 'gothings-profile',
  standalone: true,
  imports: [
    ButtonSelectImageComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    SelectComponent,
  ],
  templateUrl: './profile.page.html',
})
export default class ProfilePage {
  private readonly imageService: ImageService;
  protected readonly Icon = Icon;
  protected readonly Validators = Validators;
  authService: AuthService;
  userService: UserService;
  formGroup: FormGroup;
  photo: string;
  errorMessage: string;

  constructor() {
    this.authService = inject(AuthService);
    this.imageService = inject(ImageService);
    this.userService = inject(UserService);
    this.formGroup = new FormGroup({});
    this.photo = '';
    this.errorMessage = '';
    this.photo = this.authService.user.photo;
  }

  onEditProfile() {
    const userDto: UserDto = toDto(this.formGroup.value);
    userDto.photo = this.photo;
    this.userService.editProfile(userDto).subscribe({
      next: () => {
        this.authService.setUser(userDto);
        window.location.reload();
      },
      error: e => (this.errorMessage = e.error.message),
    });
  }

  onImageSelected(image: string) {
    this.imageService.uploadImage(image).subscribe({
      next: imageResponse => {
        this.photo = imageResponse.data.url;
      },
    });
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