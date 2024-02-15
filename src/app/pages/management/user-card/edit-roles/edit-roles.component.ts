import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Icon } from '@core/enums/icon';
import { SelectComponent } from '@shared/components/select/select.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonType } from '@core/enums/button-type';
import { RoleUtil } from '@core/utils/role.util';
import { getKey } from '@core/utils/enum.util';
import { Role } from '@core/enums/role';
import { Role as RoleType } from '@core/types/roles.type';
import { UserAccountService } from '@shared/services/user-account.service';

@Component({
  selector: 'gothings-edit-roles',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SelectComponent,
    InputComponent,
    AngularSvgIconModule,
    SelectComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './edit-roles.component.html',
})
export class EditRolesComponent {
  protected readonly Icon = Icon;
  protected readonly ButtonType = ButtonType;
  private readonly userService: UserAccountService = inject(UserAccountService);
  errorMessage: string = '';
  message: string = '';

  @Input() roles!: RoleUtil[];
  @Input() username!: string;

  onSave() {
    const selectedRoles = this.roles
      .filter(role => role.isSelected)
      .map(role => getKey(Role, role.role) as RoleType);
    const rolesHasSelected = this.roles.some(role => role.hasSelected);
    if (rolesHasSelected) {
      const removeRoles: RoleType[] = this.roles
        .filter(role => !role.isSelected && role.hasSelected)
        .map(role => getKey(Role, role.role) as RoleType);
      this.removeRoles(removeRoles);
    } else {
      this.saveRoles(selectedRoles);
    }
  }

  private saveRoles(selectedRoles: RoleType[]) {
    const rolesWithLabel = this.getRolesWithLabel(selectedRoles);
    this.userService.addRoles(this.username, rolesWithLabel).subscribe({
      next: () => {
        this.message = 'Roles guardados correctamente';
      },
      error: err => {
        this.errorMessage = err.error.message;
      },
    });
  }

  private removeRoles(roles: RoleType[]) {
    this.userService
      .removeRoles(this.username, this.getRolesWithLabel(roles))
      .subscribe({
        next: () => {
          this.message = 'Roles eliminados correctamente';
        },
        error: err => {
          this.errorMessage = err.error.message;
        },
      });
  }

  private getRolesWithLabel(selectedRoles: RoleType[]) {
    return selectedRoles.map(role => 'ROLE_'.concat(role));
  }

  onSelectedRole(role: Event) {
    const selectedRole = (role.target as HTMLElement).textContent;
    this.roles = this.roles.map(roleUtil => {
      if (roleUtil.role === selectedRole) {
        roleUtil.toggleSelected();
      }
      return roleUtil;
    });
  }

  existsErrorMessage() {
    return this.errorMessage !== '';
  }
}
