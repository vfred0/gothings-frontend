import { UserDto } from '@core/dtos/user.dto';
import { RoleUtil } from '@core/utils/role.util';

export interface UserCard {
  user: UserDto;
  roles: RoleUtil[];
}