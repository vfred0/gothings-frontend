import { Icon } from '@core/enums/icon';
import { Role } from '@core/enums/role';

export class RoleUtil {
  icon: string;
  _selected: boolean;
  role: Role;
  hasSelected: boolean;

  constructor(role: Role) {
    this.icon = Icon.Unchecked;
    this._selected = false;
    this.role = role;
    this.hasSelected = false;
  }

  get isSelected() {
    return this._selected;
  }

  toggleSelected() {
    this._selected = !this._selected;
    this.icon = this._selected ? Icon.Checked : Icon.Unchecked;
  }

  setSelected() {
    this._selected = true;
    this.hasSelected = this._selected;
    this.icon = Icon.Checked;
  }
}
