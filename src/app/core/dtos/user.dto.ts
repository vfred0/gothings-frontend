import { Role } from '@core/types/roles.type';

export interface UserDto {
  id: string;
  photo: string;
  names: string;
  username: string;
  roles: Role[];
  numberWhatsapp: string;
  about: string;
  createdAt: string;
}
