import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '@core/enums/icon';
import { ParseDate } from '@core/utils/parse-date';
import { HeaderDetailComponent } from '@shared/components/header-detail/header-detail.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonType } from '@core/enums/button-type';
import { EditRolesComponent } from '@pages/management/components/edit-roles/edit-roles.component';
import { HeaderDetail } from '@core/models/header-detail';
import { AuthService } from '@shared/services/auth.service';
import { UserDto } from '@core/dtos/user.dto';
import { RoleUtil } from '@core/utils/role.util';
import { getAllValues, getValue } from '@core/utils/enum.util';
import { Role } from '@core/enums/role';

@Component({
  selector: 'gothings-user-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    HeaderDetailComponent,
    HeaderDetailComponent,
    ButtonComponent,
    EditRolesComponent,
  ],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
  protected readonly ButtonType = ButtonType;
  protected readonly Icon = Icon;

  showEditRoles: boolean;
  headerDetail: HeaderDetail;
  authService: AuthService;
  @Input() user!: UserDto;
  roles!: RoleUtil[];

  constructor() {
    this.showEditRoles = false;
    this.headerDetail = {} as HeaderDetail;
    this.authService = inject(AuthService);
  }

  ngOnInit(): void {
    this.headerDetail = {
      photo: this.user.photo,
      title: this.user.names,
      description: 'Registrado '.concat(
        ParseDate.toRelativeTime(this.user.createdAt)
      ),
    } as HeaderDetail;
    this.roles = this.getRoles();
  }

  onDeleteUser() {
    console.log('Delete user');
  }

  getRoles() {
    const roles: RoleUtil[] = [];
    this.user.roles.forEach(role => {
      const removeWordRole = role.replace('ROLE_', '');
      const value = getValue(Role, removeWordRole as Role) as Role;
      this.getRolesUtil().forEach(roleUtil => {
        if (roleUtil.role === value) {
          roleUtil.setSelected();
        }
        roles.push(roleUtil);
      });
    });

    if (roles.length === 0) {
      return this.getRolesUtil();
    }

    return this.removeDuplicateRoles(roles);
  }

  private removeDuplicateRoles(roles: RoleUtil[]): RoleUtil[] {
    const uniqueRoles: Map<Role, RoleUtil> = new Map();
    for (let i = 0; i < roles.length; i++) {
      const roleKey = roles[i].role;
      if (!uniqueRoles.has(roleKey) || roles[i].isSelected) {
        uniqueRoles.set(roleKey, roles[i]);
      }
    }
    return Array.from(uniqueRoles.values());
  }

  private getRolesUtil() {
    return getAllValues(Role).map(role => new RoleUtil(role as Role));
  }

  onToggleShowEditRoles() {
    this.showEditRoles = !this.showEditRoles;
  }
}
