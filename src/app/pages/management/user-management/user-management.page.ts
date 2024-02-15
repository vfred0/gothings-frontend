import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonType } from '@core/enums/button-type';
import { Icon } from '@core/enums/icon';
import { UserService } from '@shared/services/user.service';
import { InputComponent } from '@shared/components/input/input.component';
import { UserDto } from '@core/dtos/user.dto';
import { SvgIconComponent } from 'angular-svg-icon';
import { SelectComponent } from '@shared/components/select/select.component';
import { UserCardComponent } from '@pages/management/components/user-card/user-card.component';
import { toDto } from '@core/utils/form.util';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'gothings-user-management',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SvgIconComponent,
    SelectComponent,
    UserCardComponent,
    JsonPipe,
  ],
  templateUrl: './user-management.page.html',
})
export default class UserManagementPage {
  protected readonly ButtonType = ButtonType;
  protected readonly Icon = Icon;
  formGroup: FormGroup;
  service: UserService;
  users: UserDto[];
  private filterName: string;

  constructor() {
    this.service = inject(UserService);
    this.formGroup = new FormGroup({});
    this.users = [];
    this.filterName = '';
    this.setUsersAndRoles();
  }

  private setUsersAndRoles() {
    this.service.getAll().subscribe(users => {
      this.users = users.map(user => {
        if (user.photo === '') {
          user.photo = 'assets/default-profile.jpg';
        }
        return user;
      });
    });
  }

  onUpdateUsers() {
    this.filterName = toDto<{ title: string }>(
      this.formGroup.value
    ).title.toLowerCase();
  }

  getUser() {
    return this.users.filter(user =>
      user.names.toLowerCase().includes(this.filterName)
    );
  }
}
