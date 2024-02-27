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

  @Input() roles!: RoleUtil[];
  @Input() username!: string;
  showMessage!: boolean;

  onSave() {
    this.actionForRoles(true, (roles: RoleType[]) => this.saveRoles(roles));
    this.actionForRoles(false, (roles: RoleType[]) => this.removeRoles(roles));
  }

  getRoles(shouldSelect: boolean): RoleType[] {
    const condition = (role: RoleUtil) =>
      shouldSelect
        ? role.isSelected && !role.hasSelected
        : !role.isSelected && role.hasSelected;

    return this.roles
      .filter(condition)
      .map((role: RoleUtil) => getKey(Role, role.role) as RoleType);
  }

  private actionForRoles(
    obtainRoles: boolean,
    action: (roles: RoleType[]) => void
  ) {
    const roles: RoleType[] = this.getRoles(obtainRoles);
    if (roles.length > 0) {
      action(roles);
      this.showMessage = !this.showMessage;
    }
  }

  private saveRoles(selectedRoles: RoleType[]) {
    const rolesWithLabel = this.getRolesWithLabel(selectedRoles);
    this.userService.addRoles(this.username, rolesWithLabel).subscribe({
      error: err => {
        this.errorMessage = err.error.message;
      },
    });
  }

  private removeRoles(roles: RoleType[]) {
    this.userService
      .removeRoles(this.username, this.getRolesWithLabel(roles))
      .subscribe({
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
